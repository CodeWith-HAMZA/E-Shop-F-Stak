const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product Name Is Required"] },
    description: {
      type: String,
      required: [true, "Product Description is Requred"],
    },
    price: {
      type: Number,
      required: [true, "Product Price Is Required"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        publicId: {
          type: String,
          required: [true, "Product Public-Image-Id Is Required"],
        },
        url: {
          type: String,
          required: [true, "Product Public-Image-URL Is Required"],
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Product Category Is Required"],
    },
    stock: {
      type: Number,
      default: 1,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    reviews: {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: { type: String },
    },
  },
  {
    writeConcern: {
      j: true,
      wtimeout: 1000
    }
  }
);

const ProductModel = mongoose.model("EProducts", productSchema);
module.exports = ProductModel
