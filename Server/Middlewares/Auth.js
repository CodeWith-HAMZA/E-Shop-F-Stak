const jwt = require("jsonwebtoken");

exports.checkUserAuthorization = async (req, res, next) => {
  try {
    // * User (Client) Must have {{Auth-JWT-Token}} To Proceed Further
    if (req.headers["token"]) {
      const token = req.headers["token"];

      // ? Token Found In Headers Then, {Verify / Decode} If the token is VALID for the current User
      const DecodedUser = await jwt.verify(token, "process.env.JWT_SECRETKEY");
      req["user"] = DecodedUser;
      req["token"] = token;

      // * Proceed Further move on...
      return next();
    } else {
      return res.status(401).json({ message: "You Are Not Allowed To Access This Resource With Out Login, & Send Auth-Token Through Headers" });
    }
  } catch (error) {
    // * Token is INVALID for the current User
    return res.status(500).json({
      message: "Token Is Tempored or Manipulated From Client Side ;(",
    });
  }
};

// ? Middleware To Check If The "User" (Client) Is "Admin"(Special User) Or A (Normal User)
exports.checkUserRoleAuthorization = function (checkRequiredRole = "admin") {
  return (req, res, next) => {
    // ? Checking If The "User" Has The Exact Same Role (admin or a normal user)
    if (req.user["role"] !== checkRequiredRole) {
      console.log("Admin role: " + req.user["role"]);

      return res.status(403).json({
        message: `${req.user["role"]} role is not Allowed to access this Resource 403`,
      });
    }

    // ? But if it's "admin" Then Proceed Further...
    return next();
  };
};
