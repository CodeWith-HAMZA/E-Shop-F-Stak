const ShopModel = require("../Schemas/ShopModel");
const UserModel = require("../Schemas/UserModel");

exports._createShop = async (req, res) => {
  // Extract the necessary fields from the request body
  const {
    owner,
    name,
    description,
    address,
    city,
    state,
    zip,
    productCategories,
  } = req.body;

  try {
    // Find the owner in the UserModel
    const user = await UserModel.findById(owner);
    if (!user) {
      // Return an error response if the owner is not found
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    // Create a new shop using the ShopModel schema
    const newShop = new ShopModel({
      owner,
      name,
      description,
      address,
      city,
      state,
      zip,
      productCategories, // array of strings
    });

    // Save the new shop to the database
    await newShop.save();

    // Return a success response
    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
      shop: newShop,
    });
  } catch (error) {
    // Check if the error is a validation error
    if (error.name === "ValidationError") {
      // Return a validation error response
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }
    // Return a general error response
    return res.status(500).json({
      success: false,
      message: "Failed to create shop",
      error: error.message,
    });
  }
};
exports._getShopsForSpecificUser = (req, res) => {};
exports._getAllShops = (req, res) => {};
exports._getSingleShopDetailsForSpecificUser = (req, res) => {};
exports._getSingleShopDetails = (req, res) => {};
exports._updateShop = (req, res) => {};
exports._deleteShop = (req, res) => {};
