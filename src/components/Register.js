import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = (props) => {
  const contract = props.contract_prop;
  const account = props.account_prop;
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    emailAddress: "",
    fathersName: "",
    mothersName: "",
    phoneNumber: "",
    permanentAddress: "",
    localAddress: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.values(formData).every((value) => value !== "")) {
        const provider = window.ethereum;
        if (typeof provider !== "undefined") {
          const fname = formData.firstName;
          const lname = formData.lastName;
          const dob = formData.dob.toString();
          const nationality = formData.nationality;
          const emailAddress = formData.emailAddress;
          const localAddress = formData.localAddress.toString();
          const permanentAddress = formData.permanentAddress.toString();
          const phoneNumber = formData.phoneNumber.toString();
          const fathersName = formData.fathersName.toString();
          const mothersName = formData.mothersName.toString();
          try {
            setIsLoading(true);
            await contract.methods
              .add_user(
                fname,
                lname,
                dob,
                nationality,
                emailAddress,
                account + "2131",
                fathersName,
                mothersName,
                phoneNumber,
                permanentAddress,
                localAddress
              )
              .send({ from: account });
            alert("registeration succesfull");
            setIsLoading(true);

            navigate("/dashboard");
          } catch (e) {
            navigate("/register");
          }
        } else {
          alert("Please fill all fields!");
        }
      } else {
        alert("Please fill all fields!");
      }
    } catch (e) {
      navigate("/register");
      alert("Error while registering, please try again.");
      console.log(e);
    }
  };

  return (
    <>
      {isLoading && <div className="loading-overlay"></div>}
      <div className={`${isLoading ? "blurred" : ""}`}>
        <div className="register-container">
          <h1>Register Page</h1>
          <div className="register-content">
            <p>
              Looks like you are not a registered user, fill the below form to
              get started
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fathersName">Fathers Name:</label>
                <input
                  type="text"
                  id="fathersName"
                  name="fathersName"
                  value={formData.fathersName}
                  onChange={handleInputChange}
                />
                <label htmlFor="mothersName">Mothers Name:</label>
                <input
                  type="text"
                  id="mothersName"
                  name="mothersName"
                  value={formData.mothersName}
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
                <label htmlFor="nationality">Nationality:</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address:</label>
                <input
                  type="email"
                  id="emailAddress"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                />
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="permanentAddress">Permanent Address:</label>
                <input
                  type="text"
                  id="permanentAddress"
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                />
                <label htmlFor="localAddress">Local Address:</label>
                <input
                  type="text"
                  id="localAddress"
                  name="localAddress"
                  value={formData.localAddress}
                  onChange={handleInputChange}
                />
              </div>
              <button className="register-button" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
