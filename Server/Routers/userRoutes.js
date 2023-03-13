const userRouter = require("express").Router();

// * Controllers
const {
  _registerUser,
  _loginUser,
  _forgotPassword,
  _resetPassword,
  _getUserDetails,
} = require("../Controllers/userController");
const { checkUserAuthorization } = require("../Middlewares/Auth");

// TODO: Make Post-Request & Provide {{Credentials}} Through "Body"
// * Would Return The Success-Response With Auth-Token(JWT) If {{Provided-Credentials}} Are Valid
userRouter.route("/register").post(_registerUser);

// TODO: Make POST-Request & Provide {{email, password}}  through "Body"
// * Would Return The Success-Response With Auth-Token(JWT) If {{Provide-Email-&-Password}} Are Valid
userRouter.route("/login").post(_loginUser);

// TODO: Make POST-Request & Provide {{email}} through "Body"
// * Would Send The {{ Reset-Password-Token / Any-Random-String }} Through {{Nodemailer}} To The {{Provided-Gmail}}
userRouter.route("/forgotpassword").post(_forgotPassword);

userRouter
  .route("/getuserdetails")
  .get(checkUserAuthorization, _getUserDetails);

userRouter.route("/resetpassword/:resetPasswordToken").put(_resetPassword);

module.exports = userRouter;
