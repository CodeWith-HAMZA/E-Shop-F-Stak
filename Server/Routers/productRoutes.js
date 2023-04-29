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

// * Product-Specific Routes
productRouter.route("/getproducts").get((req, res, next) => {
  next();
}, _getAllProducts);

productRouter.route("/productdetails/:id").get(_getProductDetails);
productRouter
  .route("/createproduct")
  .post(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _createProduct
  );
productRouter
  .route("/updateproduct/:id")
  .put(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _updateProduct
  );
productRouter.route("/deleteproduct/:id").delete(_deleteProduct);
productRouter
  .route("/postReview")
  .patch(checkUserAuthorization, _createProductReview);

// * Get All Reviews Of A Single Products
productRouter.route("/getAllReviews/:productId").get(_getProductReviews);

// productRouter.route("/deleteA/:productId").delete();

module.exports = productRouter;
