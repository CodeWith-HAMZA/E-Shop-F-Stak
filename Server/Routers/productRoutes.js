const productRouter = require("express").Router();
const {
  _getAllProducts,
  _createProduct,
  _updateProduct,
  _deleteProduct,
  _getProductDetails,
} = require("../Controllers/productController");
const { 
  checkUserAdminAuthorization,
  checkUserAuthorization,
} = require("../Middlewares/Auth");

// * Product-Specific Routes
productRouter.route("/getproducts").get(
  (req, res, next) => {
    console.log("1st Layer Of Middle Ware");
    next();
  },
  (req, res, next) => {
    console.log("2nd Layer Par aa Gaya Due To Calling next() function");
    next();
  },
  checkUserAuthorization,
  checkUserAdminAuthorization("admin"),
  _getAllProducts
);
productRouter.route("/productdetails/:id").get(_getProductDetails);
productRouter.route("/createproduct").post(_createProduct);
productRouter.route("/updateproduct").put(_updateProduct);
productRouter.route("/deleteproduct").delete(_deleteProduct);

module.exports = productRouter;
