const productRouter = require("express").Router();
const {
  _getAllProducts,
  _createProduct,
  _updateProduct,
  _deleteProduct,
  _getProductDetails,
  _createProductReview,
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
  .route("/updateproduct")
  .put(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _updateProduct
  );
productRouter.route("/deleteproduct").delete(_deleteProduct);
productRouter.route("/productReview").post(checkUserAuthorization, _createProductReview);


module.exports = productRouter;
