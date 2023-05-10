const productRouter = require("express").Router();
const {
  _getAllProducts,
  _createProduct,
  _updateProduct,
  _deleteProduct,
  _getProductDetails,
  _createProductReview,
  _getAllReviews,
  _getProductReviews,
} = require("../Controllers/productController");
const {
  checkUserRoleAuthorization,
  checkUserAuthorization,
} = require("../Middlewares/Auth");

/**
 * Express route handler for getting all products.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns None
 */
productRouter.route("/products").get(_getAllProducts);

/**
 * Defines a route for creating a new product and maps it to the _createProduct function.
 * @function
 * @param {string} path - The path for the route.
 * @param {function} middleware - The middleware function(s) to be executed before the request handler.
 * @param {function} requestHandler - The function that handles the request.
 * @returns None
 */
productRouter
  .route("/products/new")
  .post(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _createProduct
  );

/**
 * Defines the routes for a single product, including getting, updating, and deleting.
 * @param {string} "/products/:id" - the URL path for the product routes
 * @param {function} _getProductDetails - the function to handle GET requests for product details
 * @param {function} _updateProduct - the function to handle PUT requests to update a product
 * @param {function} _deleteProduct - the function to handle DELETE requests to delete a product
 * @returns None
 */
productRouter
  .route("/products/:id")
  .get(_getProductDetails)
  .put(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _updateProduct
  )
  .delete(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _deleteProduct
  );

/**
 * Defines a route for creating a new review for a product with the given ID.
 * @param {string} "/products/:id/reviews/new" - the URL path for the route
 * @param {function} checkUserAuthorization - middleware function to check if user is authorized
 * @param {function} _createProductReview - controller function to create a new product review
 * @returns None
 */
productRouter
  .route("/products/:id/reviews/new")
  .patch(checkUserAuthorization, _createProductReview);

/**
 * Express route handler for getting the reviews of a product.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @returns None
 */

productRouter.route("/reviews").get(_getProductReviews);

// productRouter.route("/deleteA/:productId").delete();

module.exports = productRouter;
