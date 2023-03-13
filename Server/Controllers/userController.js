const UserModel = require("../Schemas/UserModel");
const validator = require("validator");
const SendMail = require("../Utilities/SendMail");
const JWT = require("jsonwebtoken");
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
      return res.status(400).json({ error: "Please provide valid email" });
    }

    // * Validating Password-Length (Must Be 8 at least)
    if (password.length <= 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }

    // * Creating User In DB After Validation
    const user = await UserModel.create(req.body);

    // console.log(user)
    // * Password Token
    const resetPasswordToken = await user.generateResetPasswordToken();
    console.log(resetPasswordToken, "Password Reset Token");
    await SendMail(resetPasswordToken, "mrw58901878@gmail.com");

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
      return res.status(404).json({ error: "User Not Found" });
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

    // * Generating Reset-Password-Token Through JWT-Token
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
      const User = await UserModel.findOne({ email: user.email });

      // * Password And ConfirmPassword Must be Defined & Same
      if (password && confirmPassword && password === confirmPassword) {
        console.log(User);

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
    return res.status(404).json({ success: false, message: "User Not Found" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error (500)", error });
  }
};



// * LOGIN-REQUIRED, MUST SEND {{AUTH-TOKEN}} Through {{Headers}}
exports._getUserDetails = async function (req, res) {
  try {
    const user = await UserModel.findById(req.user["_id"]);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error (500)" });
  }
};
