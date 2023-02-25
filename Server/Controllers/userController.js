const UserModel = require("../Schemas/UserModel");

// * Posting New-User
exports._registerUser = async (req, res) => {
  try {
    // * Creating User IN DB After Validation
    const user = await UserModel.create(req.body);
    console.log("asouthoseuatoeh");

    // * Generating Auth-Token Based On {{User-Payload}}
    const token = await user.generateJWTAuthToken();
    console.log("asouthoseuatoeh");

    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
exports._loginUser = (req, res) => {
  return res.json({ success: "Login" });
};
