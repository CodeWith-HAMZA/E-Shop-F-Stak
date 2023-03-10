const userRouter = require("express").Router();
const { _registerUser, _loginUser, _forgotPassword } = require("../Controllers/userController");

// * User-Specific Routes
userRouter.route("/register").post(_registerUser);
userRouter.route("/login").post(_loginUser);
userRouter.route("/forgotpassword").post(_forgotPassword);
 

module.exports = userRouter;
