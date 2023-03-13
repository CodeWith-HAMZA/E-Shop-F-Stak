const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const UserModelSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name Is Required"] },
    email: {
      type: String,
      required: [true, "Email Is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
      select: false,
      minLength: 8,
    },
    profile: {
      public_id: {
        type: String,
        required: [true, "Public Id Is Required"],
      },
      imageUrl: {
        type: String,
        required: [true, "Image Url Is Required"],
      },
    },
    role: {
      type: String,
      required: [true, "Role Is Required"],
      enum: ["user", "admin"],
      default: "user",
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordTokenExpiration: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// * hash password with bcryptjs after save event
UserModelSchema.pre("save", async function (next) {
  // * Handling Condition For Reset-Password To Prevent The [Hash Of Already-Hashed-Password]
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});

// * Check Password With Bcryptjs
UserModelSchema.methods.isCorrectPassword = async function (givenPassword) {
  // * Matching the Given-Password (Entered) against the Hash of Already-Hashed-Password
  console.log(this.password);
  const isCorrect = await bcrypt.compare(givenPassword, this.password);
  return isCorrect;
};

// * Generating JWT-Auth-Token By Individual-User-Payload
UserModelSchema.methods.generateJWTAuthToken = async function () {
  const { _id, name, email, role } = this;
  const token = await jwt.sign(
    {
      _id: _id,
      name: name,
      email: email,
      role: role,
    },
    "process.env.JWT_SECRETKEY",
    { expiresIn: "7d" }
  );
  return token;
};

UserModelSchema.methods.generateResetPasswordToken = async function () {
  console.log("Reset Password Token Generated Kro");
};
const UserModel = mongoose.model("User", UserModelSchema);
module.exports = UserModel;
