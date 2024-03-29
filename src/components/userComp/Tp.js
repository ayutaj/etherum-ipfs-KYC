// import React from "react";
// import axios from "axios";
// import { JSEncrypt } from "jsencrypt";
const Tp = (props) => {
  // const privateKey = `-----BEGIN RSA PRIVATE KEY-----${process.env.REACT_APP_PRIVATEKEY}=-----END RSA PRIVATE KEY-----`;
  // let decryptuser = new JSEncrypt();
  // decryptuser.setPrivateKey(privateKey);
  // let dec_user = decryptuser.decrypt(
  //   "B0qrQ9j0sG3mboK8OKBirR+VKFBjkg4tQ+w1a+KeH9b6rpyUhpjYwSb99wYRzaKby7FYvxkaltAS4rmCqsAsxilgCWBQ7SJztDcPC9BpMw8OhNgLpjLnh+j0Dq+cQq+1ZLZNgTzdwcHvOfoToNiWulB3W38+15LG1VrDcrFFTr3VFj9ipyIUVPST/54mw1uafunMgYw1+w2YcjwzhT9xz6W3h1GSm0pa4Wuk1QUKe/u2ftgs/MIzeazbFEMqsz02jAaCo1Uu+5k4kkndCVyFED3ShmRZ2UatED6ULxT//SyiGGSLy0+fw/X9LdQXHr78LGMm/9FKJJeVOsRdrcgvQg=="
  // );
  // let private_bank_key =
  //   "-----BEGIN RSA PRIVATE KEY-----MIIEowIBAAKCAQEApMvn7eVBXkg/zQvDB15yLvtu8YRHo4bfk5jLgz4lgKdzVOD/M5BfpAgGw4Eyo+USnuQQCsWKp0OLQI8LjNrZaukBaUJF2k3ce8mu7sxBcLjPpxph/Dg999KB4Gh1Dl6I9nFCDHoaftxkDLH7BbzpZ06gg56DhFBsMYnBDrICkRURlx1HLV5vAfl70hOPJId310XTFr8BX3VSIoIrNueToBpJ9oUwBKQdeBRZFi4YvmqmCOgJsno8gmqiRT6xglnXnrGylbIrz2BV4S/yRNBkomc4eh4Ayo0T8a42CuRFshVpcVbyZixW2HMTdZ8/WrQs5/tktCZBQretrL5L47CRdwIDAQABAoIBADJxJ4Ct16BgRQciPoQW6KRw2bibYMIxGmY3MrPtZdVHbAnjBLpnyp6OxmM5PKLmDxkLfc2OQa6JAiq0njhzFHGg+Imbe34irwZE6YK2iqFSMF1ZufxVysH8cTybPJk1Xn7wk+L1zP5fv1ATel57QIYajw86ic8KPtO68pjo69g0NoODML4YAsfKOi32IoGzEyzIJ7PeYgyop1Cwa1+T6cJ8UBeMUZ0eU+dXepUILHwl1rrHRAMXA0wly6WSq0GGl9DDbzcbaa0qve9EFPoACdu4MhTRL53WXeMmTwQAT8xxRGhJmvAU74yeToo8x0z7BBIULOn0ZCKBPXu7LvOQA8ECgYEA+l9v7UIYlr6MbHvreNdXP2W8jZT4TrfuuvX0NoPBUPKNp36+QY8nFbKNBk7tEIF8eR7pY6ZEtenAoj619w3IMrCFBpVObfEm+DFgvh2Av0eaYVfPrOh4UL8LmR6X4/FpJGVQ9sPiT44TBZ+pgZyU0DlrWvldo8aa1jwuLrBHcfkCgYEAqIAXRS14kv7OYZIU4zSqal6BGQt5Vl+4KEh7BETluFyC9DIXxl5qfL/r3HH4eaj3iAZZ75N+5pM9OMw1gunz/pOtkMLYOHmoDAmGJw8aGX1IGHYIPBuV6iCP5vZqCumMQKMYrQ0hwdjSxF9V8ePeHFlPrkcLNGS3NRkphtUw+u8CgYAPdftEbHN2Q5gKTvCwiqOxn4ewOoXG3qbYVr3Y6/PxGrlSoYoAJGXmehspS5BqF4TnOdhxtd/CWAf0POkhs3EsaCgeyvOH6H9ejjYKJ2o+5Z4L6s9BPy3G1rVRpEj+43Z5r+P7CQedoAlerIhcH5406YbOnF2C8o23MworCemviQKBgQCnZ7M22Gk9aYfzaiX0YYOZ8FBEaKDhTnHxG6mUYTr1wnucTxRN0cnsLOUQ++5IOLXMX7sEib5/J/OgNUpIyVTPLTs4YkxdN4jchK3Sqm9cuZpiKwodZa64kCdH6LMMKmJcaW1/qFdMdrVXwfvqOWCXO6gtVonsQM/AIkKeobpq4wKBgD7Z+ty9XSo1aM7yCynwPdED9Za1KWTVafUQLaetE/M9PPOVIAcpyI4ow3L0il4L2TGdR1gYWqyH/O04GTKVMf781tk0jtkjsle0niOCwJSm9gXY1RZLtj8qul0c8+A1YEgw4KkI+DrOn7QuQFVEA5dfToNa473HK1gesaty0J5B-----END RSA PRIVATE KEY-----";
  // let decryptbank = new JSEncrypt();
  // decryptbank.setPrivateKey(private_bank_key);
  // let dec_bank = decryptbank.decrypt(
  //   "YIWQ8vOuwDhzX9X05iSr+Ym+4rSHvEBax72ebQ6ibToDA+E6YeRaiivVWYPXsLyZpBx0JJIz6nxYlQybqEz26C35xOtpPva2/EDsga71/1jU983ppHh9H5IWuPmfyVskeg9X31NXJxOgKdH2pcA6r/h9OtgzFNeKas83vCrucvjcvrn5WabJkk+DxN8NKBFw97LJdQyFSZ7dxHLU+7GmHtjynmlVnhi6EHZPrYQm68aSKJ7BrJQFCZ8SIyO1pSM/171o3cfUaiaIgQTFlp15cHwXKhumTo/gX/kwpYPfpZ57uGGihd5gyHWFXfesMXideHzLxYFbc4aAgptI+0n8WQ=="
  // );
  // console.log(`user ${dec_user}`);
  // console.log(dec_bank);
  // console.log("yoasdas");
};
export default Tp;
