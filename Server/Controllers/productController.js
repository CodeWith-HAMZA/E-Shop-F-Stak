const ProductModel = require("../Schemas/ProductModel");

exports._getAllProducts = async (req, res) => {

  let q = { ...req.query }
  // * Filtering The Products By Using "Regular-Expressions"
  if (q["name"]) {
    q["name"] = new RegExp(q["name"])
  }

  console.log(2)

  const SkippedProducts = q.resultsPerPage * ((q.pageNumber) - 1);

  try {

    console.log("first")

    console.log(q)
    const products = await ProductModel.find(q).skip(Number(SkippedProducts)).limit(Number(q.resultsPerPage));
    const totalResults = await ProductModel.countDocuments()

    return res.status(200).json({ success: true, products, totalResults });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false, message: "ERROR WHILE FETCHING PRODUCTS" });
  }
};
exports._getProductDetails = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
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

    return res.status(200).json({ success: true, CreatedProduct, message: "Successfully Created ;)" });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ success: false, message: "ERROR WHILE CREATING PRODUCTS", error });
  }
};

exports._updateProduct = async (req, res) => {
  try {

    // * Find One By Doc-Id And Update Itself
    const updatedProduct = await ProductModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })

    return res.status(500).json({ success: true, message: "SUccessfully Updated", updatedProduct })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Couldn't Be Updated ;( (ISE)" })
  }
};

exports._deleteProduct = async (req, res) => {
  try {

    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id)

    return res.status(500).json({ success: false, message: "Successfully Deleted  ", deletedProduct })
  } catch (error) {
    return res.status(500).json({ success: true, message: "Couldn't Be Daletde ;( (ISE)", updatedProduct })
  }

};
