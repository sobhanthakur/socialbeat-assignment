const Product = require("../../models/Product");

/*
 * Create new Todo
 */
const add = async (req, res) => {
  try {
    // Create new Product
    product = new Product(req.body);

    // Save to DB (Commit)
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * Get All Products
 */
const getAll = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

module.exports = { add, getAll };
