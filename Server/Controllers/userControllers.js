// .select('+password') -> To Expose {select: false}-Field Like Here Password-Field
const UserModel = require("../Schemas/UserModel");
const validator = require("validator");
const SendMail = require("../Utilities/SendMail");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { trace } = require("../Routers/userRoutes");

/**
 * Registers a new user with the given email and password.
 * @param {Object} req - The request object containing the user's email and password.
 * @param {string} req.body.email - The email of the user to be registered.
 * @param {string} req.body.password - The password of the user to be registered.
 * @param {Object} res - The response object.
 * @returns {Object} The response object containing the newly created user and a JWT auth token.
 * @throws {Object} Returns an error object with a message if there is an issue with the request.
 */
exports._registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // * Validating User Body-Data (Both-Are-Required)
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    // * Validating Email-Format If It's (Invalid)
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please provide valid email" });
    }

    const User = await UserModel.findOne({ email });
    if (User) {
      return res.status(400).json({
        success: false,
        message: "Account Already Exist With This Email",
      });
    }

    // * Validating Password-Length (Must Be 8 at least)
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // * Creating User In DB After Validation
    const user = await UserModel.create(req.body);

    // * Password Token
    const resetPasswordToken = await user.generateResetPasswordToken();
    console.log(resetPasswordToken, "Password Reset Token");
    // await SendMail(resetPasswordToken, "mrw58901878@gmail.com");

    // * Generating Auth-Token Based On {{User-Payload}}
    const token = await user.generateJWTAuthToken();

    // * Returning Response
    return res.status(201).json({ user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error (500)" });
  }
};

/**
 * Logs in a user with the given email and password.
 * @param {Object} req - The request object containing the user's email and password.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Object} The user object and a JWT token if the login is successful, or an error message if it fails.
 */
exports._loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    // * Validating Email-Format If It's (Invalid)
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Please provide valid email" });
    }
    // * Validating Password-Length (Must Be 8 at least)
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    // * Find The User-Document Based On {{Given-Email}} Through Body
    const user = await UserModel.findOne({ email: email }).select("+password");
    console.log(user);

    // * Don't Proceed Further If User Doesn't Exist!
    if (!user) {
      return res.status(404).json({ error: "Account Doesn't Exist, Make One" });
    }

    // * Match the {{Given-Password}} With {{Hashed-Password}}
    if (!(await user.isCorrectPassword(password))) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    // * Generate Token Based On The Payload After Auth-Process
    const token = await user.generateJWTAuthToken();
    return res.status(200).json({ user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error (500)" });
  }
};

/**
 * Sends a reset password token to the user's email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success or error message.
 * @throws {Error} - If there is an error generating the JWT auth token or sending the email.
 */
exports._forgotPassword = async function (req, res) {
  const { email } = req.body; // * Getting {{Email}} From {{Body}}
  console.log(email);
  try {
    // * Validating User Body-Data (Both-Are-Required)
    if (!email) {
      return res.status(400).json({ error: "Please provide email " });
    }

    // * Validating Email-Format If It's (Invalid)
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Please provide valid email" });
    }
    // * Fetching/Finding User From DB Through The {{Given-Email}}
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User Not Found  " });
    }

    // * Generating Reset-Password-Token Through JWT-Token To Send To The User's Gmail-Account
    const resetPasswordToken = await user.generateJWTAuthToken();

    console.log(resetPasswordToken, "Password Reset Token");

    // * Sending Reset-Password-Token Through On The {{Given-Gmail}}
    // await SendMail(resetPasswordToken, email);
    // * Gotta send gmail without nodemailer (anyother-way)

    // * Sending Success Response
    return res.status(200).json({
      success: true,
      message: `Successfully not sent The Reset-Password-Token To Your Gmail: ${email}`,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Resets the password for a user with the given reset password token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success or error message.
 */
exports._resetPassword = async function (req, res) {
  const { resetPasswordToken } = req.params;
  const { password, confirmPassword } = req.body;

  try {
    // * Decoding User Through The Provided Token
    const user = await JWT.verify(
      resetPasswordToken,
      "process.env.JWT_SECRETKEY"
    );

    // * User Decoded Successfully Through JWT-Token
    if (user) {
      // * Finding User By Its Email(Decoded Through JWT-Token) through "Params"
      const User = await UserModel.findOne({ email: user.email }).select(
        "+password"
      );

      console.log(User, User["email"], User["password"]);
      // * Password And ConfirmPassword Must be Defined & Same
      if (password && confirmPassword && password === confirmPassword) {
        console.log(User);

        // * Handling This Case: Jhaapu Ny Wahi Password Dubara Rakhdiya means (Old-Password === New-Password) :/
        if (await bcrypt.compare(password, User["password"])) {
          return res.status(409).json({
            success: false,
            message: "This Is Your Old Password Murkh ;(",
          });
        }

        // * Updating user's Password
        User["password"] = password;

        // * Saving The User-Document With The Changed-Password Into DB
        await User.save();

        return res.status(200).json({
          success: true,
          message:
            "successfully Reseted Your Password Now You Can Login With Your New Password",
        });
      }

      return res.status(403).json({
        success: false,
        message:
          "Kindly, Check Your Password And Confirm-Password If They Aren't The Same Or Empty",
      });
    }
    return res
      .status(404)
      .json({ success: false, message: "User Not Found (404)" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error 500)", error });
  }
};

/**
  For-ADMIN
 * Retrieves the details of the currently logged in user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON object containing the user details if successful, 
 * or an error message if unsuccessful.
 * @throws {Error} - Throws an error if there is an issue retrieving the user details.
 */
exports._getUserDetails = async function (req, res) {
  try {
    // * Finding Document By {{Document-Id}}
    const user = await UserModel.findById(req.user["_id"]);

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error (500)" });
  }
};

/**
 * Changes the password of the user associated with the request.
 * @param {Object} req - Send Auth-Token For the verification
 * @param {Object} res - The response object.
 * @returns None
 * @throws {Error} If there is an error while changing the password.
 */
exports._changePassword = async function (req, res) {
  const { oldPassword, password, confirmPassword } = req.body;

  try {
    if (!oldPassword) {
      return res.status(409).json({
        success: false,
        message: "Enter your Old Password",
      });
    }
    const User = await UserModel.findById(req.user["_id"]).select("+password");
    console.log(User);

    if (!(await bcrypt.compare(oldPassword, User["password"]))) {
      return res.status(409).json({
        success: false,
        message: " Old-Password Is In-Correct ;(",
      });
    }
    if (password && confirmPassword && password === confirmPassword) {
      if (await bcrypt.compare(password, User["password"])) {
        return res.status(409).json({
          success: false,
          message: "This Is Your Old Password Murkh ;(",
        });
      }
      // * Changing Password
      User["password"] = password;
      await User.save();

      return res.status(200).json({
        success: true,
        message:
          "successfully Changed Your Password Now You Can Login With Your New Password",
      });
    } else {
      return res.status(403).json({
        success: false,
        message:
          "Kindly, Check Your Password And Confirm-Password If They Aren't The Same Or Empty",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error (500)" });
  }
};

/**
 * Updates the user's profile with the given email, name, and role.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A JSON object containing the updated user's information.
 * @throws {Object} - A JSON object containing an error message if the update fails.
 */
exports._updateProfile = async function (req, res) {
  try {
    const { email, name, role } = req.body;

    // * Conditionally Appending Properties, These Properties Are Comming From {{req.body}} (client-side)
    const newUserData = {
      ...(name ? { name } : {}),
      // ...(email ? { email } : {}),
      ...(role ? { role } : {}),
    };
    // Would Update The Doc With This Provided Information -> email, name, role, profile-pic

    const User = await UserModel.findByIdAndUpdate(
      req.user["_id"],
      newUserData,
      {
        new: true,
      }
    );
    console.log(User);
    return res.status(200).json({
      success: true,
      message: "Updated Your Account Successfully  ",
      User,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error (500)" });
  }
};

/**
For-ADMIN
 * Retrieves all user accounts from the database and returns them as a JSON object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A JSON object containing all user accounts on the site.
 * @throws {Object} - A JSON object indicating an internal server error if the operation fails.
 */
exports._getAllUsers = async function (req, res) {
  try {
    const Users = await UserModel.find({});
    return res.status(200).json({
      success: true,
      message: "All User's Accounts On The Site",
      Users,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error (500)" });
  }
};

/**
  For-Admin
 * Retrieves a single user from the database with the given ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON object containing the user information if successful, or an error message if not.
 * @throws {Error} - Throws an error if there is an issue with the database connection.
 */
exports._getSingleUser = async function (req, res) {
  const { id } = req.params;
  try {
    const User = await UserModel.findOne({ _id: id });
    if (!User) {
      return res.status(404).json({
        success: false,
        message: `The Required User ${id} does not exist (404)`,
        User,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Success, All Required Information About The User ${id}`,
      User,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error (500)" });
  }
};

/**
 * Deletes a single user from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the success status, message, and deleted user object.
 * @throws {Object} - The response object containing the error status and message.
 */
exports._deleteSingleUser = async function (req, res) {
  const { id } = req.params;
  try {
    // * Finding User Through {{Given-Object-Id}} Through {{Params}}
    const User = await UserModel.findById(id);
    if (!User) {
      return res.status(404).json({
        success: false,
        message: `The Required User ${id} does not exist (404)`,
        User,
      });
    }

    // * Deleting The Found User Through {{Given-Object-Id}} Through {{Params}}
    await UserModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: `Successfully Deleted The User ${id}`,
      User,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error, message: "Internal Server Error (500)" });
  }
};
