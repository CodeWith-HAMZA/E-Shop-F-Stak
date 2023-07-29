const { isValidObjectId } = require("mongoose");
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

  if (!owner) {
    return res.status(404).json({
      success: false,
      message: "User(Owner)-Id Not Found!",
    });
  }
  if (!isValidObjectId(owner)) {
    return res.status(400).json({
      success: false,
      message: "User(Owner)-Id Is Invalid!",
    });
  }
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
    console.log(req.body);
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
      message: "Shop Create Successfully",
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

exports._getShopsForSpecificUser = async (req, res) => {
  // // const  {ownerId} = req.query ;
  const ownerId = req["user"]["_id"];

  try {
    // Check if userId is a valid ObjectId
    if (!ownerId)
      return res.status(400).json({ error: " Owner-Id (ownerId) Not Found" });

    if (!isValidObjectId(ownerId))
      return res.status(400).json({ error: "Invalid Owner-Id (ownerId)" });

    // Find all shops owned by the user
    const shops = await ShopModel.find({ owner: ownerId }).exec();

    if (!shops || shops.length === 0) {
      return res.status(404).json({ error: "No shops found for this user" });
    }

    // Return the list of shops
    return res.status(200).json({
      success: true,
      shops,
      message: "All Shops For An Specific User",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error Finding Shops" });
  }
};

exports._getSingleShopDetailsForSpecificUser = async (req, res) => {
  const ownerId = req["user"]["_id"];
  const shopId = req.params.id;

  try {
    // Check if userId and shopId are valid ObjectIds
    if (!isValidObjectId(ownerId) || !isValidObjectId(shopId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID or shop ID" });
    }

    // Find the shop owned by the user
    const shop = await ShopModel.findOne({ _id: shopId, owner: ownerId });

    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    // Return the shop details
    return res.status(200).json({ success: true, shop });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error While Fetching The Shop Details" });
  }
};

// * Admin-Route
exports._getAllShops = async (req, res) => {
  try {
    const shops = await ShopModel.find({}).exec();

    if (!shops || shops.length === 0) {
      return res.status(404).send({ message: "No shops found." });
    }

    return res.status(200).send(shops);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: "Error occurred while retrieving shops." });
  }
};
// * Admin-Route

exports._getSingleShopDetails = async (req, res) => {
  try {
    const shopId = req.params.id;

    // Find the shop details by ID
    const shop = await ShopModel.findById(shopId);

    // Check if the shop exists
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Return the shop details
    return res.status(200).json({ shop });
  } catch (error) {
    // Handle any error that occurs during the process
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
exports._updateShop = async (req, res) => {
  try {
    const shopId = req.params.id;
    const updateData = req.body;

    // Find the shop by ID and update its details
    const updatedShop = await ShopModel.findByIdAndUpdate(
      shopId,
      updateData,
      { new: true } // Return the updated shop after the update
    );

    // Check if the shop exists
    if (!updatedShop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Return the updated shop
    return res.status(200).json({ shop: updatedShop });
  } catch (error) {
    // Handle any error that occurs during the process
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
exports._deleteShop = async (req, res) => {
  try {
    const shopId = req.params.id;

    // Validate that shopId is a valid ObjectId
    if (!isValidObjectId(shopId)) {
      return res.status(400).json({ error: "Invalid ShopId" });
    }

    // Find the shop by ID
    // const shop = await ShopModel.findByIdAndDelete(shopId);

    // Check if the shop exists
    // if (!shop) {
    //   return res.status(404).json({ error: "Shop not found" });
    // }
    // Find the shop by ID and delete it
    const deletedShop = await ShopModel.findByIdAndDelete(shopId);

    // Check if the shop exists
    if (!deletedShop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Return a success message
    return res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    // Handle any error that occurs during the process
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
