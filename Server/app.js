const express = require("express");
const app = express();
const productRoutes = require("./Routers/productRoutes");

// * All-Routes
app.use("/api", productRoutes);


// * Wah BETE moj nhi  nhi kardi  
// app.get("/", (req, res) => res.send("Hello World!"));

module.exports = app;
