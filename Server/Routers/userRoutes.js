const { _registerUser } = require("../Controllers/userController");

const userRouter = require("express").Router();

// * User-Specific Routes
userRouter.route("/registeruser").post(_registerUser);
