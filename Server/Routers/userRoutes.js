const userRouter = require("express").Router();

// * Controllers
const {
  _registerUser,
  _loginUser,
  _forgotPassword,
  _resetPassword,
  _getUserDetails,
  _changePassword,
  _updateProfile,
  _getAllUsers,
  _getSingleUser,
  _deleteSingleUser,
} = require("../Controllers/userControllers");
const {
  checkUserAuthorization,
  checkUserRoleAuthorization,
} = require("../Middlewares/Auth");

/*
 * Public-Routes (No Log-In Required)
 */
// TODO: Make Post-Request & Provide {{Credentials}} Through "Body"
// * Would Return The Success-Response With Auth-Token(JWT) If {{Provided-Credentials}} Are Valid
userRouter.route("/register").post(_registerUser);

// TODO: Make POST-Request & Provide {{email, password}}  through "Body"

// * Would Return The Success-Response With Auth-Token(JWT) If {{Provide-Email-&-Password}} Are Valid
userRouter.route("/login").post(_loginUser);

// TODO: Make POST-Request & Provide {{Valid-email}} through "Body"
// * Would Send The {{ Reset-Password-Token / Any-Random-String }} Through {{Nodemailer}} To The {{Provided-email}}
userRouter.route("/forgotpassword").post(_forgotPassword);

// TODO: Make PUT-Request & Provide {{Valid-Reset-Password-Token}} through "Params" & {{Password, Confirm-Password}} through "Body"
// * Would Find The Document Corresponding To {{Given-Email}} Then Update {{Password-Field}} Of That Document
userRouter.route("/resetpassword/:resetPasswordToken").put(_resetPassword);

/*
 * Routes For Authorized (Logged-In) Users
 */
// TODO: Make GET-Request & Provide
userRouter.route("/myself").get(checkUserAuthorization, _getUserDetails);

// TODO: Make PUT-Request & Provide
userRouter.route("/updateprofile").put(checkUserAuthorization, _updateProfile);

// TODO: Make PUT-Request & Provide {{Auth-Token}} Through Headers
userRouter
  .route("/updatePassword")
  .put(checkUserAuthorization, _changePassword);
 

/*
 * Admin-Routes
 */
//  TODO: Make GET-Request & Provide {{Auth-Token}} Of {role: "admin"} Through Headers
userRouter
  .route("/getAllUsers")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _getAllUsers
  );

//  TODO: Make GET-Request & Provide {{Auth-Token}} Of {role: "admin"} Through Headers
userRouter
  .route("/getSingleUser/:id")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _getSingleUser
  );
//  TODO: Make GET-Request & Provide {{Auth-Token}} Of {role: "admin"} Through Headers
userRouter
  .route("/deleteSingleUser/:id")
  .delete(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _deleteSingleUser
  );


module.exports = userRouter;
