const stripe = require("stripe");
const { default: mongoose } = require("mongoose");
const OrderModel = require("../Schemas/OrderModel");
const ProductModel = require("../Schemas/ProductModel");
const UserModel = require("../Schemas/UserModel");

// * ADMIN-ROUTE (Get All Orders Of All The Users)
exports._getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    // Handle case when there are no orders
    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, error: "No orders found" });
    }

    let totalAmount = 0;
    // orders.forEach((order
    orders.forEach((order) => {
      totalAmount += order.itemsTotalPrice;
    });

    return res.status(200).json({
      success: true,
      orders,
      totalResults: orders.length,
      totalAmount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

// * LOGIN-ROUTE (Get Orders For Spcific User)
exports._getOrdersForSpecificUser = async (req, res) => {
  let userId = req.user["_id"];

  // * Handle case when userId is not provided in the request
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  try {
    const orders = await OrderModel.find({ user: req.user["_id"] });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for the specified user",
      });
    } else {
      return res
        .status(200)
        .json({ success: true, orders, tatalResults: orders.length });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
// Login route
exports._getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order Object ID" });
    }

    const order = await OrderModel.findById(orderId).populate({
      path: "user",
      select: "name email",
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// * LOGIN-ROUTE (Create Order For The User)
exports._createOrder = async (req, res) => {
  let {
    user,
    orderItems,
    orderStatus,
    shippingInfo,
    paymentInfo,
    itemsTotalPrice,
    paidAt,
    dileveredAt,
  } = req.body;

  try {
    // // Check if all required fields are present in request body
    // if (
    //   !user ||
    //   !shippingInfo ||
    //   !orderItems ||
    //   !paymentInfo ||
    //   !itemsTotalPrice
    // ) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Missing required fields" });
    // }
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "User is required" });
    }

    // Check if the ordered products exist and have enough stock
    for (let orderItem of orderItems) {
      const orderedProduct = await ProductModel.findById(orderItem.productId);

      if (!orderedProduct) {
        return res.status(400).json({
          success: false,
          message: `Product with id ${orderItem.productId} not found`,
        });
      }
      if (orderedProduct.stock < orderItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product ${orderedProduct.name}`,
        });
      }

      // * Assgning The Values Of The Actual Product To {{Each-Order-Item}}(Ordered-Product)
      orderItem.name = orderedProduct.name;
      orderItem.price = orderedProduct.price;

      orderItem.itemsTotalPrice += orderedProduct.price;
    }

    // * Check if user exists
    const User = await UserModel.findById(user);
    if (!User) {
      return res
        .status(400)
        .json({ success: false, error: "Given User Not Found In The DB" });
    }
    shippingInfo.customerName = User.name;
    const newOrder = await OrderModel.create({
      user: req.user["_id"],
      orderItems,
      orderStatus,
      shippingInfo,
      paymentInfo,
      itemsTotalPrice,
      paidAt,
      dileveredAt,
    });

    return res.status(201).json({ success: true, newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
    // Handle validation errors
    // if (err.name === "ValidationError") {
    //   return res.status(400).json({ success: false, error: err.message });
    // }

    // return res.status(500).json({ success: false, error: "Server error" });
  }
};

//  * ADMNI
exports.updateOrder = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // * Agar Order-Status "Delivered" He  Then beta lot ja kuch krna hee nhi he...
    if (order.orderStatus === "Delivered") {
      return res
        .status(400)
        .json({ message: "You Already Delivered This Order" });
    }

    order.orderItems.forEach(async (orderItem) => {
      await updateStock(orderItem.productId, orderItem.quantity);
    });

    order.orderStatus = status;

    if (status === "Delivered") {
      order.dileveredAt = Date.now();
    }
    const updatedOrder = await order.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

async function updateStock(productId, productQuantity) {
  const product = await ProductModel.findById(productId);
  product.stock -= productQuantity;
  await product.save({ validateAfterSave: false });
}



// * Check out with stripe payment gateway
exports._checkout = async (req, res) => {
  const {success_url, cancel_url, orderItems} = req.body
  try {
    const paymentIntent = await  stripe.checkout.sessions.create({
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
      success_url: 'https://www.google.com/', // Replace with your success URL
      cancel_url: 'https://www.facebook/', // Replace with your cancel URL
    })
      console.log("first")
    // Handle successful payment
    res.status(200).json({ success: true, data: req.body, url:paymentIntent.url   });
  } catch (error) {
    // Handle payment error
    res.status(500).json({ error });
  }

}


// app.post('/charge', async (req, res) => {  
//   try {
//     const paymentIntent = await  stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: "pkr",
//             product_data: {
//               name: 'Tshirt XL/LG Gym', // Replace with the name of your product
//               // Other product details if necessary
//             },
//             unit_amount: 24*100,
//           },
//           quantity: 3,
//         },
       
//       ],
//       mode: 'payment',
//       success_url: 'https://www.google.com/', // Replace with your success URL
//       cancel_url: 'https://www.facebook/', // Replace with your cancel URL
//     })
//       console.log("first")
//     // Handle successful payment
//     res.status(200).json({ success: true, data: req.body, url:paymentIntent.url   });
//   } catch (error) {
//     // Handle payment error
//     res.status(500).json({ error: error });
//   }
// });



