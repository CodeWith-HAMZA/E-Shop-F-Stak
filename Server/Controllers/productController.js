const ProductModel = require("../Schemas/ProductModel");

/**
 * Retrieves all products from the database that match the given query parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns Returns a JSON object containing the list products if successful, or an error message if not.
 */
exports._getAllProducts = async (req, res) => {
  let q = { ...req.query };
  const { name, gt, lt } = q;
  // * Filtering The Products By Using "Regular-Expressions" For The "Search-Keyword-Filteration"
  if (name) {
    q["name"] = new RegExp(name, "i");
  }

  // * Conditionally Appending Price-Filteration-Fields (Adding Multiple Fields To The Price Field)
  q["price"] = {
    ...(gt && { $gt: gt }),
    ...(lt && { $lt: lt }),
  };

  const { resultsPerPage, pageNumber } = q;

  // * Number Of Pages Skipped On Changing Page-Number With Respect To The Given-Results-Per-Page (Content-Limit)
  const SkippedProducts = resultsPerPage * (pageNumber - 1);

  // * These Fields, Not That Important For The Query-Filteration
  const ToBeRemovedFields = [
    !gt && !lt ? "price" : "",
    "resultsPerPage",
    "pageNumber",
    "gt",
    "lt",
  ];

  ToBeRemovedFields.forEach((field) => delete q[field]);

  console.log(q);

  try {
    // * Fetching All The Products From the Database According To the (Query)
    const products = await ProductModel.find(
      { ...q },
      // ["name", "price"],
      resultsPerPage
        ? {
            limit: Number.parseInt(resultsPerPage),
            skip: Number.parseInt(SkippedProducts),
          }
        : {}
    );

    const totalResults = products.length;

    return res.status(200).json({ success: true, totalResults, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "ERROR WHILE FETCHING PRODUCTS",
      error,
    });
  }
};

/**
 * Retrieves the details of a single product from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON object containing the product details if successful, or an error message if not.
 */
exports._getProductDetails = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      return res.status(200).json({ success: true, product });
    } else {
      return res.status(404).json({
        success: false,
        product,
        message: "Required Product Not Found",
      });
    }
  } catch (error) {
    console.log(product);
    return res.status(500).json({
      success: false,
      message: "ERROR WHILE FETCHING A SINGLE PRODUCT DETAILS",
    });
  }
};

/**
 * Creates a new product in the database using the request body.
 * @param {Object} req - The request object containing the product information.
 * @param {Object} res - The response object to send back to the client.
 * @returns {Object} A JSON object containing the success status, the created product, and a message.
 * @throws {Object} An error object containing information about the error that occurred.
 */
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

/**
 * Updates a product in the database with the given ID and request body.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A JSON object containing a success message and the updated product.
 * @throws {Object} - A JSON object containing a failure message if the update fails.
 */
exports._updateProduct = async (req, res) => {
  try {
    // * Find One By Doc-Id And Update Itself
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    console.log("Update", req.params.id);
    return res
      .status(500)
      .json({ success: true, message: "SUccessfully Updated", updatedProduct });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Couldn't Be Updated ;( (ISE)" });
  }
};

/**
 * Deletes a product from the database with the given ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A JSON object containing a success message and the deleted product, or an error message.
 * @throws {Error} - If there is an error deleting the product from the database.
 */
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
      message: "Couldn't Be Deleted ;( (ISE)",
    });
  }
};

/**
 * Creates a new product review and saves it to the database.
 * @param {Object} req - The request object containing the review information.
 * @param {Object} res - The response object to send back to the client.
 * @returns {Object} A JSON object containing a success message if the review was successfully posted, or an error message if there was an issue.
 */
exports._createProductReview = async (req, res) => {
  // * On Which Product The We're Gonna Review, that will define the {{productId}}
  const { rating, comment, productId } = req.body;
  const review = {
    rating: Number(rating),
    comment,
    name: req.user["name"],
    user: req.user["_id"],
  };
  let IsAlreadyReviewed = false;
  try {
    const product = await ProductModel.findOne({ _id: productId });
    // * Product Found
    if (product) {
      console.log("han");
      for (let _ of product["reviews"]) {
        // * If The User Already {{Reviewed}}, Then Update His/Her Previous Review
        if (_["user"].toString() === req.user["_id"].toString()) {
          IsAlreadyReviewed = true;

          // * Updating Properties
          _.comment = review.comment;
          _.rating = review.rating;
          _.name = review.name;
          _.user = review.user;
        }
      }

      // * If The User Not Already {{Reviewed}}, Then Push His/Her Reviews Into The Array
      if (!IsAlreadyReviewed) {
        product["reviews"].push(review);
      }

      // * Calculating Average-Ratings By Combining Each User's Rating
      let ratingsAvg = 0;
      product["reviews"].forEach((rev) => {
        ratingsAvg += rev["rating"];
      });
      ratingsAvg /= product["reviews"].length;
      product["ratings"] = ratingsAvg;

      console.log(product.reviews.length);
      product["totalReviews"] = product["reviews"].length;

      // * Saving Into DB
      await product.save({ validateBeforeSave: false });

      return res.status(201).json({
        success: true,
        message: `Successfully Posted Review ${req.user["name"]}`,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Product not found ",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error 500 ",
      error,
    });
  }
};

/**
 * Retrieves all reviews for a given product from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON object containing the reviews for the given product.
 * @throws {Object} - Returns a JSON object containing an error message if there is an error retrieving the reviews.
 */
exports._getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const { reviews } = await ProductModel.findOne({ _id: productId });
    return res.status(200).json({
      success: true,
      message: "All Reviews For A Given Product",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
      error,
    });
  }
};

/**
 * Deletes a single review for a given product and returns all remaining reviews for that product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON object with the remaining reviews for the product.
 * @throws {Object} - Returns a 500 status code with an error message if there is an internal server error.
 */
exports._deleteSingleReview = async (req, res) => {
  const { productId } = req.params;

  try {
    const { reviews } = await ProductModel.findOne({ _id: productId });
    return res.status(200).json({
      success: true,
      message: "All Reviews For A Given Product",
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
      error,
    });
  }
};
