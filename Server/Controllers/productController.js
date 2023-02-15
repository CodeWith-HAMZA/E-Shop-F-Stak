exports._getAllProducts = async (req, res) => {
  return res.status(200).send("get all products");
};
exports._getProductDetails = async (req, res) => {
  return res.status(200).send("get single prdouct details ");
};
exports._createProduct = async (req, res) => {
  return res.status(200).send("Create");
};
exports._updateProduct = async (req, res) => {
  return res.status(200).send("update");
};
exports._deleteProduct = async (req, res) => {
  return res.status(200).send("del");
};
