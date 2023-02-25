const UserModel = require("../Schemas/UserModel");
const validator = require("validator");

// * Posting New-User
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
    console.log("asouthoseuatoeh");

    // * Generating Auth-Token Based On {{User-Payload}}
    const token = await user.generateJWTAuthToken();
    console.log("asouthoseuatoeh");

    return res.status(201).json({ user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Internal Server Error (500)" });
  }
};
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
