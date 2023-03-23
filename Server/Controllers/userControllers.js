// .select('+password') -> To Expose {select: false}-Field Like Here Password-Field
const UserModel = require("../Schemas/UserModel");
const validator = require("validator");
const SendMail = require("../Utilities/SendMail");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { trace } = require("../Routers/userRoutes");
// * Register New-User
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

    const User = await UserModel.findOne({ email: email });
    if (User) {
      return res.status(400).json({
        success: false,
        message: "Account Already Exist With This Email",
      });
    }

    // * Validating Password-Length (Must Be 8 at least)
    if (password.length <= 8) {
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

// * Login User
exports._loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
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
    if (password.length <= 8) {
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
    await SendMail(resetPasswordToken, email);

    // * Sending Success Response
    return res.status(200).json({
      success: true,
      message: `Successfully Sent The Reset-Password-Token To Your Gmail: ${email}`,
    });
  } catch (error) {
    console.log(error);
  }
};

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
      .json({ success: false, message: "Internal Server Error (500)", error });
  }
};

// * LOGIN-REQUIRED, MUST SEND {{AUTH-TOKEN}} Through {{Headers}}
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

// * LOGIN-REQUIRED, MUST SEND {{AUTH-TOKEN}} Through {{Headers}}
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

// * Update User's Profile
exports._updateProfile = async function (req, res) {
  try {
    const { email, name, role } = req.body;

    // * Conditionally Appending Properties, These Properties Are Comming From {{req.body}} (client-side)
    const newUserData = {
      ...(name && { name }),
      ...(email && { email }),
      ...(role && { role }),
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
    return res
      .status(200)
      .json({ success: true, message: "Updated Your Account Successfully  ", User });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error (500)" });
  }
};

// * ADMIN-ROUTE
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

// * ADMIN-ROUTE
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
// * ADMIN-ROUTE -Delete-User
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
