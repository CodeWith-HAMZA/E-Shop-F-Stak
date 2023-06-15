const {
  _getOrdersForSpecificUser,
  _getAllOrders,
  _createOrder,
  _getOrderDetails,
  _checkout,
} = require("../Controllers/orderControllers");
const {
  checkUserAuthorization,
  checkUserRoleAuthorization,
} = require("../Middlewares/Auth");

const orderRouter = require("express").Router();

/**
 * Express route handler for creating a new order.
 * @function
 * @param {function} checkUserAuthorization - Middleware function to check if user is authorized.
 * @param {function} _createOrder - Controller function to create a new order.
 * @returns None
 */
orderRouter.route("/new").post(checkUserAuthorization, _createOrder);

/**
 * Express route for getting orders for a specific user.
 * @name GET /orders
 * @function
 * @memberof orderRouter
 * @inner
 * @param {function} checkUserAuthorization - Middleware function to check user authorization.
 * @param {function} _getOrdersForSpecificUser - Controller function to get orders for a specific user.
 * @returns None
 */
orderRouter.route("/").get(checkUserAuthorization, _getOrdersForSpecificUser);

/**
 * Express route for getting the details of a specific order.
 * @name GET /order/:orderId
 * @function
 * @memberof orderRouter
 * @param {string} orderId - The ID of the order to retrieve.
 * @param {function} checkUserAuthorization - Middleware function to check if the user is authorized to access the order.
 * @param {function} _getOrderDetails - Controller function to retrieve the details of the order.
 * @returns None
 */
orderRouter.route("/:id").get(checkUserAuthorization, _getOrderDetails);

// * Admin
/**
 * Express route for getting all orders.
 * @name GET /api/orders/allOrders
 * @function
 * @memberof module:routes/orderRouter
 * @param {function} checkUserAuthorization - Middleware function to check if user is authorized.
 * @param {function} checkUserRoleAuthorization - Middleware function to check if user has admin role.
 * @param {function} _getAllOrders - Controller function to get all orders.
 * @returns None
 */

orderRouter
  .route("/admin")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _getAllOrders
  );


  // * Gotta work on soon
  orderRouter.route('/checkout').post(_checkout);
module.exports = orderRouter;
