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
    const CreatedProduct = await ProductModel.create(req.body);

    return res.status(200).json({ success: true, CreatedProduct });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false, message: "ERROR WHILE CREATING PRODUCTS", error });
  }
};
exports._updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id)

    return res.status(500).json({ success: true, message: "SUccessfully Updated", updatedProduct })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Couldn't Be Updated ;( (ISE)" })
  }
};

exports._deleteProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndDelete(req.params.id)

    return res.status(500).json({ success: false, message: "Successfully Deleted  " })
  } catch (error) {
    return res.status(500).json({ success: true, message: "Couldn't Be Daletde ;( (ISE)", updatedProduct })
  }

};
