const shopRouter = require("express").Router();

const {
  _getShopsForSpecificUser,
  _getAllShops,
  _updateShop,
  _getSingleShopDetailsForSpecificUser,
  _getSingleShopDetails,
  _deleteShop,
  _createShop,
} = require("../Controllers/shopController");
const {
  checkUserAuthorization,
  checkUserRoleAuthorization,
} = require("../Middlewares/Auth");

// * For Seller
shopRouter
  .route("/new")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("seller"),
    _createShop
  );
shopRouter
  .route("/")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("seller"),
    _getShopsForSpecificUser
  );

shopRouter
  .route("/:id")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("seller"),
    _getSingleShopDetailsForSpecificUser
  )
  .put(
    checkUserAuthorization,
    checkUserRoleAuthorization("seller"),
    _updateShop
  )
  .delete(
    checkUserAuthorization,
    checkUserRoleAuthorization("seller"),
    _deleteShop
  );

// * For Admin
shopRouter
  .route("/admin")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _getAllShops
  );
shopRouter
  .route("/admin/:id")
  .get(
    checkUserAuthorization,
    checkUserRoleAuthorization("admin"),
    _getSingleShopDetails
  );

module.exports = shopRouter;
