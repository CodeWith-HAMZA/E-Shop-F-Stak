const productRouter = require("express").Router();
const {
  _getAllProducts,
  _createProduct,
  _updateProduct,
  _deleteProduct,
  _getProductDetails,
} = require("../Controllers/productController");

// * Product-Specific Routes
productRouter.route("/getproducts").get(_getAllProducts);
productRouter.route("/productdetails/:id").get(_getProductDetails);
productRouter.route("/createproduct").post(_createProduct);
productRouter.route("/updateproduct").put(_updateProduct);
productRouter.route("/deleteproduct").delete(_deleteProduct);

module.exports = productRouter;
