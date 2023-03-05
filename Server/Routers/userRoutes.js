const userRouter = require("express").Router();
const { _registerUser, _loginUser } = require("../Controllers/userController");

// * User-Specific Routes
userRouter.route("/register").post(_registerUser);
userRouter.route("/login").post(_loginUser);
 

module.exports = userRouter;
