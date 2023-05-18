const jwt = require("jsonwebtoken");

/**
 * Checks if the user is authorized to access the requested resource by verifying the token
 * in the request headers.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns None
 * @throws {Error} If the token is invalid or missing, returns a 401 or 500 error.
 */
exports.checkUserAuthorization = async (req, res, next) => {
  try {
    // * User Client Must have {{Auth-JWT-Token}} To Proceed Further
    if (req.headers["token"]) {
      const token = req.headers["token"];

      // ? Token Found In Headers Then, {Verify / Decode} If the token is VALID for the current User
      const DecodedUser = await jwt.verify(token, "process.env.JWT_SECRETKEY");
      req["user"] = DecodedUser;
      req["token"] = token;

      // * Proceed Further move on...
      return next();
    } else {
      return res.status(401).json({
        message:
          "You Are Not Allowed To Access This Resource With Out Login, & Send Auth-Token Through Headers",
      });
    }
  } catch (error) {
    // * Token is INVALID for the current User
    return res.status(500).json({
      message: "Token Is Tempered or Manipulated From Client Side ;(",
    });
  }
};

// ? Middleware To Check If The "User" (Client) Is "Admin"(Special User) Or A (Normal User)
/**
 * Checks if the user has the required role to access a resource.
 * @param {string} checkRequiredRole - the required role to access the resource. Default is "admin".
 * @returns A middleware function that checks if the user has the required role.
 * If the user does not have the required role, a 403 error is returned.
 */
exports.checkUserRoleAuthorization = function (checkRequiredRole = "admin") {
  return (req, res, next) => {
    // ? Checking If The "User" Has The Exact Same Role (admin or a normal user)
    if (req.user["role"] !== checkRequiredRole.toLowerCase()) {
      console.log("Admin role: " + req.user["role"]);

      return res.status(403).json({
        message: `${req.user["role"]} role is not Allowed to Access this Resource 403`,
      });
    }

    // ? But if it's "admin" Then Proceed Further...
    return next();
  };
};
