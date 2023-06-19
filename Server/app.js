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



app.post('/charge', async (req, res) => {  
  const {orderItems} = req.body
  console.log(
    

    
  )
  try {
    const paymentIntent = await  stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: orderItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,  
          },
          unit_amount:  item.price * 100,  
        },
        quantity: item.quantity,
      })),
      
      mode: 'payment',
      success_url: 'http://localhost:3000/checkout/payment-success/', // Replace with your success URL
      cancel_url: 'http://localhost:3000/checkout/payment-cancel/', // Replace with your cancel URL
    })
    
    // Handle successful payment
    res.status(200).json({ success: true,   url:paymentIntent.url   });
  } catch (error) {
    // Handle payment error
    res.status(500).json({ error });
  }
});


module.exports = app;
