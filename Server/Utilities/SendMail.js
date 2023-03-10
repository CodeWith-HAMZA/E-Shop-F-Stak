const nodemailer = require("nodemailer");
 
async function SendMail(ResetPasswordToken, ReceiverGmail) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // * SMTP-GMAIL-HOST
    port: 587, // * Gmail-Service-PORT
    secure: false,

    // * Master-Gmail-Account (Sender)
    auth: {
      user: "hs5924414@gmail.com",
      pass: "dqdozhsgxogpupbx",
    },
  });

  try {
     
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: ReceiverGmail, // list of receivers
      subject: `Password Reset`, // Subject line
      html: `Reset Password ${ResetPasswordToken}`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = SendMail;