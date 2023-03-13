const nodemailer = require("nodemailer");

async function SendMail(ResetPasswordToken, Receiver_UserGivenGmail) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // * SMTP-GMAIL-HOST
    port: 587, // * Gmail-Service-PORT
    secure: false,

    // * Master-Gmail-Account (Sender's Gmail-Account)
    auth: {
      user: "hs5924414@gmail.com",
      pass: "dqdozhsgxogpupbx",
    },
  });

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: Receiver_UserGivenGmail, // list of receivers
      subject: `Password Reset`, // Subject line
      html: `Copy The "Reset Password Token": ${ResetPasswordToken} `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = SendMail;
