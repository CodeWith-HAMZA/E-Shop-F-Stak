const nodemailer = require("nodemailer");

async function SendMail(ResetPasswordToken, Receiver_UserGivenGmail) {
  const transporter = nodemailer.createTransport({
    // host: "smtp.gmail.com", // * SMTP-GMAIL-HOST
    // port: 587, // * Gmail-Service-PORT
    service: "gmail",
    // secure: false,

    // * Master-Gmail-Account (Sender's Gmail-Account)
    auth: {
      user: "mrw58901878@gmail.com",
      pass: "xnpyrzelhaxlrzzs",
    },
  });

  try {
    // * send mail with defined transport object
    const info = await transporter.sendMail({
      from: "mrw58901878@gmail.com", // sender address
      to: "starjoker343@gmail.com", // list of receivers
      subject: `Password Reset`, // Subject line
      html: `Copy The "Reset Password TTTTT": ${ResetPasswordToken} `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = SendMail;
