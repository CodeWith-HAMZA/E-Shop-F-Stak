const { urlencoded } = require("express");
const express = require("express");
const ConnectDB = require("./Configs/ConnectDB");
const orderRouter = require("./Routers/orderRoutes");
const app = express();
const productRouter = require("./Routers/productRoutes");
const userRouter = require("./Routers/userRoutes");
app.use(express.json()); // for Parsing-JSON
// app.use(express.urlencoded({extended: true})) // for URL-ENCODED

// * All-Routes
app.use("/api/v1", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/orders", orderRouter);

module.exports = app;
