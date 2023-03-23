const ProductModel = require("../Schemas/ProductModel");

exports._getAllProducts = async (req, res) => {
  let q = { ...req.query };

  // * Filtering The Products By Using "Regular-Expressions" For The "Search-Keyword-Filteration"
  if (q["name"]) {
    q["name"] = new RegExp(q["name"], "i");
  }

  // * Conditionally Appending Price-Filteration-Fields (Adding Multiple Fields To The Price Field)
  q["price"] = {
    ...(q["lt"] && { $lt: q["lt"] }),
    ...(q["gt"] && { $gt: q["gt"] }),
  };

  const { resultsPerPage, pageNumber, name } = q;

  // * Number Of Pages Skipped On Changing Page-Number With Respect To The Given-Results-Per-Page (Content-Limit)
  const SkippedProducts = resultsPerPage * (pageNumber - 1);

  // * These Fields, Not That Important For The Query-Filteration
  const ToBeRemovedFields = ["resultsPerPage", "pageNumber", "gt", "lt"];
  ToBeRemovedFields.forEach((field) => delete q[field]);

  try {
    console.log(q);

    // * Fetching All The Products From the Database According To the  (Query)
    const products = await ProductModel.find({ ...q }, ["name", "price"], {
      limit: Number.parseInt(resultsPerPage),
      skip: Number.parseInt(SkippedProducts),
    });

    const totalResults = products.length;

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

    return res.status(200).json({
      success: true,
      CreatedProduct,
      message: "Successfully Created ;)",
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: false,
      message: "ERROR WHILE CREATING PRODUCTS",
      error,
    });
  }
};

exports._updateProduct = async (req, res) => {
  try {
    // * Find One By Doc-Id And Update Itself
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    return res
      .status(500)
      .json({ success: true, message: "SUccessfully Updated", updatedProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Couldn't Be Updated ;( (ISE)" });
  }
};

exports._deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    return res.status(500).json({
      success: false,
      message: "Successfully Deleted  ",
      deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Couldn't Be Daletde ;( (ISE)",
      updatedProduct,
    });
  }
};

exports._createProductReview = async (req, res) => {
  const { rating, comment, name, productId } = req.body;
  const review = {
    rating: ~~rating,
    comment,
    name,
    user: req.user["_id"],
  }; 
   const product = await ProductModel.findById(productId);
   console.log(product)
  console.log(productId)


};
