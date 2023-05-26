const { urlencoded } = require("express");
const express = require("express");
const ConnectDB = require("./Configs/ConnectDB");
const orderRouter = require("./Routers/orderRoutes");
const app = express();
const productRouter = require("./Routers/productRoutes");
const userRouter = require("./Routers/userRoutes");
const cors = require("cors");
// * Enable Cross-Origin Resource Sharing (CORS) middleware to allow cross-domain requests to this API endpoint.
app.use(cors());

app.use(express.json()); // for Parsing-JSON
// app.use(express.urlencoded({extended: true})) // for URL-ENCODED

// * All-Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

module.exports = app;
