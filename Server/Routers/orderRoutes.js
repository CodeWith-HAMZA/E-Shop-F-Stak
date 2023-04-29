const {
  _getOrdersForSpecificUser,
  _getAllOrders,
  _createOrder,
  _getOrderDetails,
} = require("../Controllers/orderControllers");
const {
  checkUserAuthorization,
  checkUserRoleAuthorization,
} = require("../Middlewares/Auth");

const orderRouter = require("express").Router();

orderRouter.route("/order/new").post(checkUserAuthorization, _createOrder);

orderRouter
  .route("/orders")
  .get(checkUserAuthorization, _getOrdersForSpecificUser);

orderRouter
  .route("/order/:orderId")
  .get(checkUserAuthorization, _getOrderDetails);


// * Admin
orderRouter
  .route("/allOrders")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _getAllOrders
  );

module.exports = orderRouter;
