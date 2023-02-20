const ProductModel = require("../Schemas/ProductModel");

exports._getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false, message: "ERROR WHILE FETCHING PRODUCTS" });
  }
};
exports._getProductDetails = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id });
    return res.json({ success: true, product });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "ERROR WHILE FETCHING A SINGLE PRODUCT DETAILS",
    });
  }
};

exports._createProduct = async (req, res) => {
  try {
    const createdProduct = req.body
    console.log(createdProduct)
    const CreatedProduct = await ProductModel.create(createdProduct);

    return res.status(200).json({ success: true, createdProduct });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false, message: "ERROR WHILE CREATING PRODUCTS", error });
  }
};
exports._updateProduct = async (req, res) => {
  return res.status(200).send("update");
};
exports._deleteProduct = async (req, res) => {
  return res.status(200).send("del");
};
