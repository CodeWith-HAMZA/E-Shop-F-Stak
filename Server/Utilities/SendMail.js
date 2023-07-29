// template_zo4aqmj
const { default: axios } = require("axios");

// gmscEfDDjMUBdGiXx -public
// service_vsyheop -service
async function SendMail(ResetPasswordToken, Receiver_UserGivenGmail) {
  // Replace with your EmailJS user ID

  // emailjs
  //   .send("service_vsyheop", "template_zo4aqmj", templateParams, {
  //     publicKey: "gmscEfDDjMUBdGiXx",
  //     // privateKey: "YGnxUMbYH_l88E-DFGBHb", // optional, highly recommended for security reasons
  //   })
  //   .then(
  //     (response) => {
  //       console.log("SUCCESS!", response.status, response.text);
  //     },
  //     (err) => {
  //       console.log("FAILED...", err);
  //     }
  //   );
  const emailData = {
    service_id: "service_vsyheop", // Replace with your EmailJS service ID
    template_id: "template_zo4aqmj", // Replace with your EmailJS template ID
    user_id: "3pXuSGOaU1PzgX8Qv", // Replace with your EmailJS user ID
    template_params: {
      recipient_name: "John Doe", // Example dynamic email variable
      message: "This is the email content.", // Example dynamic email variable
      email: "wah rey",
    },
    to_email: "codeonlinesource@gmail.com", // Replace with the recipient's email address
  };
  // try {
  //   const sent = await emailjs.send(
  //     "service_vsyheop",
  //     "template_zo4aqmj",
  //     { email: "hamzasha@gmail.com", pass: "hazmeuaoh" },
  //     "3pXuSGOaU1PzgX8Qv"
  //   );
  //   console.log(sent);
  // } catch (error) {
  //   console.log("ERROR", error);
  // }

  // try {
  //   const { data } = await axios.post(
  //     "POST https://api.emailjs.com/api/v1.0/email/send",
  //     emailData
  //   );
  //   console.log(data);
  // } catch (error) {
  //   console.log(error);
  // }
}

module.exports = SendMail;
