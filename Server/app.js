const { urlencoded } = require("express");
const express = require("express");
const ConnectDB = require("./Configs/ConnectDB");
const app = express();
const productRoutes = require("./Routers/productRoutes");
app.use(express.json());

// * Connect To DB
ConnectDB(); 

// * All-Routes
app.use("/api/products", productRoutes);
 

module.exports = app;
