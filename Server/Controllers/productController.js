const ProductModel = require("../Schemas/ProductModel");
const ShopModel = require("../Schemas/ShopModel");
const mongoose = require("mongoose");
/**
 * Retrieves all products from the database that match the given query parameters.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns Returns a JSON object containing the list products if successful, or an error message if not.
 */
exports._getAllProducts = async (req, res) => {
  let q = { ...req.query };
  const { name, minPrice, maxPrice, resultsPerPage, pageNumber, sortBy } = q;

  if (Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({
      success: false,
      message: `(${
        minPrice + " > " + maxPrice
      }) Invalid price range: minPrice must be less than or equal to maxPrice.`,
    });
  }

  // *- Building {{Mongoose-Query}}
  // * Filtering The Products By Using "Regular-Expressions" For The "Search-Keyword-Filteration"
  if (name) {
    q["name"] = new RegExp(name, "i");
  }

  // * Conditionally Appending Price-Filteration-Fields (Adding Multiple Fields To The Price Field)
  q["price"] = {
    ...(minPrice && { $gte: minPrice }),
    ...(maxPrice && { $lte: maxPrice }),
  };

  // const { resultsPerPage, pageNumber } = q;

  // * Number Of Pages Skipped On Changing Page-Number With Respect To The Given-Results-Per-Page (Content-Limit)
  const SkippedProducts = resultsPerPage * (pageNumber - 1);

  /**
   * * An array of fields to be removed from a search query object.
   * * If both 'gt' and 'lt' are not present, the 'price' field is removed.
   * @type {string[]}
   */
  const ToBeRemovedFields = [
    !minPrice && !maxPrice ? "price" : "",
    "resultsPerPage",
    "pageNumber",
    "gt",
    "lt",
  ];

  ToBeRemovedFields.forEach((field) => delete q[field]);

  console.log(q);

  try {
    // const sort = {
    //   ...(sortBy === "asc" && { price: 1 }),
    //   ...(sortBy === "desc" && { price: -1 }),
    // };

    // * Fetching All The Products From the Database According To the (Query)
    let products = await ProductModel.find(
      { ...q },
      resultsPerPage
        ? {
            limit: Number.parseInt(resultsPerPage),
            skip: Number.parseInt(SkippedProducts),
          }
        : {}
    ).lean();

    const totalResults = products.length;

    if (sortBy !== "") {
      products = products.sort((p1, p2) => {
        if (sortBy === "asc") return p1.price - p2.price;
        if (sortBy === "desc") return p2.price - p1.price;
      });
    }

    return res.status(200).json({
      success: true,
      totalResults,
      products: products.slice().sort((a, b) => b.price - a.price),
    });
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
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
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
  const product = { ...req.body };
  product["category"] = product["category"].toLowerCase();

  try {
    // Check if the shop exists with the provided shop ID
    const shop = await ShopModel.findById(product.shop);

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not Found With the given ID",
      });
    }

    // Check if the product category exists in the shop's categories array
    if (!shop["productCategories"].includes(product["category"])) {
      return res.status(400).json({
        success: false,
        message: "Invalid product category for this shop",
      });
    }

    const createdProduct = await ProductModel.create(product);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: createdProduct,
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
    // Return a general error response for other types of errors
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
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
  const productId = req.params.id;
  const updatedProductData = req.body;

  try {
    // Check if the product exists in the database
    const existingProduct = await ProductModel.findById(productId);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if the shop exists in the database
    const shop = await ShopModel.findById(existingProduct["shop"]);
    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found for the product" });
    }

    // Check if the product category is valid and exists in the shop's categories array
    const newCategory = updatedProductData["category"].toLowerCase();
    if (!shop["productCategories"].includes(newCategory)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product category" });
    }

    // Update the product with the new data
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "Successfully Updated", updatedProduct });
  } catch (error) {
    // Check for validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.message,
      });
    }

    // Check for CastError (invalid ID format)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
        error: error.message,
      });
    }

    // Handle other types of errors
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
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
  const productId = req.params.id;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found for deletion",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Product successfully deleted  ",
      deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Couldn't delete the product",
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
  const { rating, comment } = { ...req.body };
  const productId = req.params.id;

  // Check if all required fields are present in the request body
  if (!rating || !comment || !productId) {
    return res.status(400).json({
      success: false,
      message: "Rating, comment, and productId are required fields",
    });
  }

  try {
    // Find the product by productId
    const product = await ProductModel.findById(productId);

    // If product not found, return a 404 status code with an error message
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found with the provided product id",
      });
    }

    // Check if the user has already reviewed the product
    const userReview = product["reviews"].find(
      (review) => review.user.toString() === req.user["_id"].toString()
    );

    if (userReview) {
      // If the user has already reviewed, update their existing review
      userReview.rating = rating;
      userReview.comment = comment;
    } else {
      // If the user has not reviewed, create a new review
      const newReview = {
        rating: Number(rating),
        comment,
        name: req.user["name"],
        user: req.user["_id"],
      };
      product["reviews"].push(newReview);
    }
    // Calculate average ratings
    let totalRatings = 0;
    product["reviews"].forEach((review) => {
      totalRatings += review["rating"];
    });
    product["ratings"] = totalRatings / product["reviews"].length;

    // Save the updated product to the database
    await product.save({ validateBeforeSave: false });

    return res.status(201).json({
      success: true,
      message: "Review posted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
  // const review = {
  //   rating: Number(rating),
  //   comment,
  //   name: req.user["name"],
  //   user: req.user["_id"],
  // };
  // let IsAlreadyReviewed = false;
  // try {
  //   const product = await ProductModel.findOne({ _id: productId });
  //   // * Product Found
  //   if (product) {
  //     console.log("han");
  //     for (let _ of product["reviews"]) {
  //       // * If The User Already {{Reviewed}}, Then Update His/Her Previous Review
  //       if (_["user"].toString() === req.user["_id"].toString()) {
  //         IsAlreadyReviewed = true;

  //         // * Updating Properties
  //         _.comment = review.comment;
  //         _.rating = review.rating;
  //         _.name = review.name;
  //         _.user = review.user;
  //       }
  //     }

  //     // * If The User Not Already {{Reviewed}}, Then Push His/Her Reviews Into The Array
  //     if (!IsAlreadyReviewed) {
  //       product["reviews"].push(review);
  //     }

  //     // * Calculating Average-Ratings By Combining Each User's Rating
  //     let ratingsAvg = 0;
  //     product["reviews"].forEach((rev) => {
  //       ratingsAvg += rev["rating"];
  //     });
  //     ratingsAvg /= product["reviews"].length;
  //     product["ratings"] = ratingsAvg;

  //     console.log(product.reviews.length);
  //     product["totalReviews"] = product["reviews"].length;

  //     // * Saving Into DB
  //     await product.save({ validateBeforeSave: false });

  //     return res.status(201).json({
  //       success: true,
  //       message: `Successfully Posted Review ${req.user["name"]}`,
  //     });
  //   } else {
  //     return res.status(404).json({
  //       success: false,
  //       message: "Product not found ",
  //     });
  //   }
  // } catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Internal Server Error 500 ",
  //     error,
  //   });
  // }
};

/**
 * Retrieves all reviews for a given product from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON object containing the reviews for the given product.
 * @throws {Object} - Returns a JSON object containing an error message if there is an error retrieving the reviews.
 */
exports._getProductReviews = async (req, res) => {
  const productId = req.params.id;
  // Validate the 'productId' to ensure it is a valid MongoDB ObjectId
  if (!mongoose.isValidObjectId(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    // Find the product by its ID and populate the 'reviews' field to get the associated reviews.
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Reviews For A Given Product",
      reviews: product["reviews"],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error ",
      error: error.message,
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
  const reviewId = req.params.reviewId;
  const productId = req.params.id;

  try {
    // Validate the 'productId' and 'reviewId' to ensure they are valid MongoDB ObjectIds
    if (
      !mongoose.isValidObjectId(productId) ||
      !mongoose.isValidObjectId(reviewId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID or review ID",
      });
    }

    // Find the product by its ID and retrieve its reviews
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = product["reviews"];
    const reviewIndex = reviews.findIndex(
      (review) => review["_id"].toString() === reviewId
    );
    if (reviewIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
    // Recalculate the average ratings and total reviews
    let ratingsSum = 0;
    // Delete the review from the product's reviews array
    reviews.splice(reviewIndex, 1);
    reviews.forEach((review) => {
      ratingsSum += review.rating;
    });
    product.ratings = ratingsSum / reviews.length;
    product.totalReviews = reviews.length;

    // Save the updated product with the review removed
    await product.save({ validateBeforeSave: false });

    // * success response
    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      remainingReviews: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
