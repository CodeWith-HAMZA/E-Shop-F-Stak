const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function SendMail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    // service: 'gmail',
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "hs5924414@gmail.com", // generated ethereal user
      pass: "dqdozhsgxogpupbx", // generated ethereal password
    },
  });

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "text@gmail.com", // sender address
      to: "mrw58901878@gmail.com", // list of receivers
      subject: "Password Reset", // Subject line
      html: "<h1>ResetPasswordURL? </h1>", 
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
}
