import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JSEncrypt } from "jsencrypt";
import "./cssFiles/Pancard.css";

const Pancard = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    fathersName: "",
    panCard: "",
    dob: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: file });
    } else {
      alert("Please upload an image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (props.bankname_prop.length === 0) {
      alert("Select Bank Type");
      return;
    }
    const acc_doc_bank_key =
      props.account_prop + ",pancard," + props.bankname_prop;
    let isApplicationpresent = await props.contract_prop.methods
      .mp_account_doc_bank(acc_doc_bank_key)
      .call();
    isApplicationpresent = Number(isApplicationpresent);
    if (isApplicationpresent === 2) {
      alert(
        `You have already applied for the Pancard for ${props.bankname_prop}. Please wait....`
      );
      return;
    }
    if (isApplicationpresent === 3) {
      alert(
        `Your KYC has been already completed for Pancard for ${props.bankname_prop}`
      );
      return;
    }
    if (props.account_prop) console.log(formData.name);
    for (const key in formData) {
      if (formData[key] === "") {
        alert(`Please fill ${key} field.`);
        return;
      }
    }

    const account = props.account_prop;

    const contract = props.contract_prop;
    const publicKeyuser = `-----BEGIN PUBLIC KEY-----${process.env.REACT_APP_PUBLIC_KEY}=-----END PUBLIC KEY-----`;
    const imgfile = formData.image;
    const modifieddata = new FormData();
    modifieddata.append("file", imgfile);
    setIsLoading(true);

    const resFile = await axios({
      method: "post",
      url: process.env.REACT_APP_PINATA_URL,
      data: modifieddata,
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
        "Content-Type": "multipart/form-data",
      },
    });
    const ipfsHash = resFile.data.IpfsHash;
    console.log(ipfsHash);

    let dc = "pancard";
    let datastring =
      account +
      "," +
      dc +
      "," +
      props.bankname_prop +
      "," +
      formData.name +
      "," +
      formData.fathersName +
      "," +
      formData.panCard +
      "," +
      formData.dob.toString();
    datastring = datastring + "," + ipfsHash;

    const encryptuser = new JSEncrypt();
    encryptuser.setPublicKey(publicKeyuser);
    const encrypted_hash_user = encryptuser.encrypt(datastring);

    let bank_publickey = await contract.methods
      .mp_public_bankKey(props.bankname_prop)
      .call();

    const encryptbank = new JSEncrypt();
    encryptbank.setPublicKey(bank_publickey);
    const encrypted_hash_bank = encryptbank.encrypt(datastring);

    let acc_doc_bank = account + "," + dc + "," + props.bankname_prop;
    await contract.methods
      .add_data_for_verification(
        account,
        encrypted_hash_user,
        encrypted_hash_bank,
        props.bankname_prop,
        acc_doc_bank,
        2
      )
      .send({ from: account });

    console.log(`encrypted_user_hash ${encrypted_hash_user}`);
    console.log(`encrypted_bank_hash ${encrypted_hash_bank}`);
    navigate("/dashboard");
    alert("uploaded_Succesfully");
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <div className="loading-overlay"></div>}
      <div className={`${isLoading ? "blurred" : ""}`}>
        <div className="pancard-form">
          <h2>Pancard Application Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fathersName">Father's Name:</label>
              <input
                type="text"
                id="fathersName"
                name="fathersName"
                value={formData.fathersName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="panCard">PAN Number:</label>
              <input
                type="text"
                id="panCard"
                name="panCard"
                value={formData.panCard}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <button type="submit">Submit Pancard Application</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pancard;

// ("-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEApMvn7eVBXkg/zQvDB15yLvtu8YRHo4bfk5jLgz4lgKdzVOD/M5BfpAgGw4Eyo+USnuQQCsWKp0OLQI8LjNrZaukBaUJF2k3ce8mu7sxBcLjPpxph/Dg999KB4Gh1Dl6I9nFCDHoaftxkDLH7BbzpZ06gg56DhFBsMYnBDrICkRURlx1HLV5vAfl70hOPJId310XTFr8BX3VSIoIrNueToBpJ9oUwBKQdeBRZFi4YvmqmCOgJsno8gmqiRT6xglnXnrGylbIrz2BV4S/yRNBkomc4eh4Ayo0T8a42CuRFshVpcVbyZixW2HMTdZ8/WrQs5/tktCZBQretrL5L47CRdwIDAQABAoIBADJxJ4Ct16BgRQciPoQW6KRw2bibYMIxGmY3MrPtZdVHbAnjBLpnyp6OxmM5PKLmDxkLfc2OQa6JAiq0njhzFHGg+Imbe34irwZE6YK2iqFSMF1ZufxVysH8cTybPJk1Xn7wk+L1zP5fv1ATel57QIYajw86ic8KPtO68pjo69g0NoODML4YAsfKOi32IoGzEyzIJ7PeYgyop1Cwa1+T6cJ8UBeMUZ0eU+dXepUILHwl1rrHRAMXA0wly6WSq0GGl9DDbzcbaa0qve9EFPoACdu4MhTRL53WXeMmTwQAT8xxRGhJmvAU74yeToo8x0z7BBIULOn0ZCKBPXu7LvOQA8ECgYEA+l9v7UIYlr6MbHvreNdXP2W8jZT4TrfuuvX0NoPBUPKNp36+QY8nFbKNBk7tEIF8eR7pY6ZEtenAoj619w3IMrCFBpVObfEm+DFgvh2Av0eaYVfPrOh4UL8LmR6X4/FpJGVQ9sPiT44TBZ+pgZyU0DlrWvldo8aa1jwuLrBHcfkCgYEAqIAXRS14kv7OYZIU4zSqal6BGQt5Vl+4KEh7BETluFyC9DIXxl5qfL/r3HH4eaj3iAZZ75N+5pM9OMw1gunz/pOtkMLYOHmoDAmGJw8aGX1IGHYIPBuV6iCP5vZqCumMQKMYrQ0hwdjSxF9V8ePeHFlPrkcLNGS3NRkphtUw+u8CgYAPdftEbHN2Q5gKTvCwiqOxn4ewOoXG3qbYVr3Y6/PxGrlSoYoAJGXmehspS5BqF4TnOdhxtd/CWAf0POkhs3EsaCgeyvOH6H9ejjYKJ2o+5Z4L6s9BPy3G1rVRpEj+43Z5r+P7CQedoAlerIhcH5406YbOnF2C8o23MworCemviQKBgQCnZ7M22Gk9aYfzaiX0YYOZ8FBEaKDhTnHxG6mUYTr1wnucTxRN0cnsLOUQ++5IOLXMX7sEib5/J/OgNUpIyVTPLTs4YkxdN4jchK3Sqm9cuZpiKwodZa64kCdH6LMMKmJcaW1/qFdMdrVXwfvqOWCXO6gtVonsQM/AIkKeobpq4wKBgD7Z+ty9XSo1aM7yCynwPdED9Za1KWTVafUQLaetE/M9PPOVIAcpyI4ow3L0il4L2TGdR1gYWqyH/O04GTKVMf781tk0jtkjsle0niOCwJSm9gXY1RZLtj8qul0c8+A1YEgw4KkI+DrOn7QuQFVEA5dfToNa473HK1gesaty0J5B-----END RSA PRIVATE KEY-----");
// ("-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApMvn7eVBXkg/zQvDB15yLvtu8YRHo4bfk5jLgz4lgKdzVOD/M5BfpAgGw4Eyo+USnuQQCsWKp0OLQI8LjNrZaukBaUJF2k3ce8mu7sxBcLjPpxph/Dg999KB4Gh1Dl6I9nFCDHoaftxkDLH7BbzpZ06gg56DhFBsMYnBDrICkRURlx1HLV5vAfl70hOPJId310XTFr8BX3VSIoIrNueToBpJ9oUwBKQdeBRZFi4YvmqmCOgJsno8gmqiRT6xglnXnrGylbIrz2BV4S/yRNBkomc4eh4Ayo0T8a42CuRFshVpcVbyZixW2HMTdZ8/WrQs5/tktCZBQretrL5L47CRdwIDAQAB-----END PUBLIC KEY-----");

//BOI
//-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEApDbcq5OPhE5gwFK7WtUAhERLMwZdSgnMH6UdP3akY+PQRKWNBe53hYyFfmNrgptP+Ap0kU8xzZpJ0xyL6P8p2G9H9iOtSgqcgtpG78Kg2fP+9LXzNMb1AXhUaI4ud+ve1QdeLgAAwUHn3SilPHrDIgZvT5Qlz3KXwqiBncqiTCdS7QbVDFbi73yR1h17I5rC7bWRuXlar5eebmA+OdhIIlnHmJkPPJk8ZgdTRiMYcOOJSj9wYKGK1W9abVSM0CNf8MlLvN/P9Sk5DovKjTuv9yu6MW7ix7HgWP+2JcstasJwRlze+i0RkclLvtP7BvWQNnDNpqqM2SNduLDDP0xp+wIDAQABAoIBAH33u8U+N4x1l1BQ5nmiBXhw7wKgMjXWWCg6P7psJ2Sc4CmYmRpguHzQs6KlX1ZcD7clRhAloP2oClOQhV7hRddKXfhZm9e9Vhwmlt3a/grTWdOcM4lbyZwsEwv1bX3+iPv/X+aHiAy3osaLJF3FiiRyrTZtXafJrtLa8jr5sxAYpns8XkU1TQb6v9oMW0nFZ2i+fL+AE09H5pAz1BzNK9p2jw1aM7Z7dbPhLFZwJgq6dtA/gTntx5SUeKhIRnJd2vCA2yecIGbyyBn9I8289/unZTNBm94EOLBtdWex2kl5PqoYwoVRMkCaTFWIMn9hjRJ0XVWz1lysKV/lj6Ty3NECgYEA9g+nhwYd47XOJsi9sskCh2S6vuF0qCgCREh9v8Ll4dNCjFzK2yGpzuAMNs8nPPrYf+udlRNhw1oMb8bExz+MA/JdEUFoYpsIXWd6jmpPvD3yaP5D0NHF9F7hctouQqwNz2MFqx4nXN68ITVn6jwRInNat4CVzL2e9xWvHTzE4sMCgYEAqtjjBvMX7AVuch27/D4izO09lbuAwSMnbsqN4BgX1DxuS433fu56wSVLxovO9PlATFf8PZ/w+ES7SQ5dyw+lJb/7uSNcIgclHWYtHaEy+rt5BCbQx6BsUrGJ04FuWqEH2C1o2VcWO3M9AfaKRGtcyR20bKJgJ8RJAqlOSdLAeGkCgYBPwAkjKSdc21sClQNuw9mO+mXQYhBGRBlf+kLPeSK6y5cBGT4iQcngpBsxVHi6Oe8bnskHPS3te+0V+U1j6sO9r7rcUd+8PdU7OMOvDuPi9gzwXKCsOKE5L9tQN0jRESS0t7ppmK9XWVWOSdnxQCCpksuvN/zVTAwOtzd3eW+yswKBgF9vcjpSlv1X9181runzx7rTl4BJ0l2RBpkD+wbATqdW7oG0FxnHm7jC3bZWKNB9X2aGC7hc3N3CfyALL2ecILOar8G2t+OmPBxVFESl5HVdPfeMuzmYKopy9Du65Gsp4tjmXNhzpk6lS+IJ1yjrFFSgDEZW2gG8ys/6xWnFmZBpAoGBAIgC3a/P745ASdQw+CptoKzxvOBI6kl08pwQ86b+165ow41OxTRjUc/jb+2PCiG/4o2dDQiBhZZlx9A8iAEdoeH/6XNfYAV9dK4kjTM1cNldNo0pHSzOR6A4veklTV8iGhDVZLOS5HQtsbieOmFMwjju0uago4ixoqO16rc1s3Q0-----END RSA PRIVATE KEY-----
//-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApDbcq5OPhE5gwFK7WtUAhERLMwZdSgnMH6UdP3akY+PQRKWNBe53hYyFfmNrgptP+Ap0kU8xzZpJ0xyL6P8p2G9H9iOtSgqcgtpG78Kg2fP+9LXzNMb1AXhUaI4ud+ve1QdeLgAAwUHn3SilPHrDIgZvT5Qlz3KXwqiBncqiTCdS7QbVDFbi73yR1h17I5rC7bWRuXlar5eebmA+OdhIIlnHmJkPPJk8ZgdTRiMYcOOJSj9wYKGK1W9abVSM0CNf8MlLvN/P9Sk5DovKjTuv9yu6MW7ix7HgWP+2JcstasJwRlze+i0RkclLvtP7BvWQNnDNpqqM2SNduLDDP0xp+wIDAQAB-----END PUBLIC KEY-----
