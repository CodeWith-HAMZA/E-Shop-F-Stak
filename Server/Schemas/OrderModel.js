const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id Is Required"],
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: [true, "Mention Store id, which this order belongs for"],
    },
    shippingInfo: {
      customerName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
      phone: { type: String, required: true },
      country: { type: String, required: true, default: "PK" },
      phone: { type: String, required: true },
    },
    orderStatus: {
      type: String,
      enum: [
        "placed",
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
        "refunded",
        "on hold",
        "partially shipped",
        "returned",
        "disputed",
      ],
      default: "pending",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "EProducts",
          required: true,
        },
      },
    ],

    paymentInfo: {
      id: { type: String, required: true },
      status: {
        type: String,
        enum: ["unpaid", "paid", "refunded"],
        default: "unpaid",
      },
    },
    paidAt: { type: Date },
    itemsTotalPrice: { type: Number, required: true, default: 0 },
    dileveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
