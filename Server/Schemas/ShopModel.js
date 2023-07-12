const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const ShopModelSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "Object Id of shop owner is required"] },
        name: { type: String, required: [true, "Name Is Required"] },
        description: { type: String, required: [true, "Description Is Required"] },
        address: { type: String, required: [true, "Address Is Required"] },
        city: { type: String, required: [true, "City Is Required"] },
        state: { type: String, required: [true, "State Is Required"] },
        zip: { type: String, required: [true, "Zip Is Required"] },
        productCategories: { type: [String] },
        products: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "EProduct"
        },
        image: {
            public_id: {
                type: String,
            },
            imageUrl: {
                type: String,
            },
        },
    },
    { timestamps: true, }
);

const ShopModel = mongoose.model("Shop", ShopModelSchema);
module.exports = ShopModel;
