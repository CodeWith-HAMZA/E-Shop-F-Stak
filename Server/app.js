const { urlencoded } = require("express");
const express = require("express");
const ConnectDB = require("./Configs/ConnectDB");
const orderRouter = require("./Routers/orderRoutes");
const app = express();
const productRouter = require("./Routers/productRoutes");
const userRouter = require("./Routers/userRoutes");
const cors = require("cors");
const S = require("stripe");
// * Enable Cross-Origin Resource Sharing (CORS) middleware to allow cross-domain requests to this API endpoint.
app.use(cors());

app.use(express.json()); 

// * All-Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.get("/h", (req, res) => {
  res.send("hamza");
});



app.post('/pay', async (req, res) => {  
  try { 
    console.log("first")
    const paymentIntent = await S.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: 'Tshirt XL/LG Gym', // Replace with the name of your product
              // Other product details if necessary
            },
            unit_amount: 3499999,
          },
          quantity: 3,
        },
       
      ],
      mode: 'payment',
      success_url:"https://www.google.com/", // Replace with your success URL
      cancel_url: "https://www.google.com/", // Replace with your cancel URL
    })
      console.log("first")
    // Handle successful payment
    res.status(200).json({ success: true , url:paymentIntent.url   });
  } catch (error) {
    // Handle payment error
    res.status(500).json({ error });
  }
});

module.exports = app;
