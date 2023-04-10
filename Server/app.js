const { urlencoded } = require("express");
const express = require("express");
const ConnectDB = require("./Configs/ConnectDB");
const app = express();
const productRouter = require("./Routers/productRoutes");
const userRouter = require("./Routers/userRoutes");
app.use(express.json()); // for Parsing-JSON
// app.use(express.urlencoded({extended: true})) // for URL-ENCODED



// * All-Routes
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);

module.exports = app;
