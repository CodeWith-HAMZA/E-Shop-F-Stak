const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Name Is Required"] },
        email: { type: String, required: [true, "Email Is Required"], unique: true },
        password: { type: String, required: [true, "Password Is Required"], select: false },
    },
    {
        timestamps: true,
    }
);
const UserModel = mongoose.model('UserModel', UserModelSchema);
module.exports = UserModel;
