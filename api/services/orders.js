const Order = require("../../models/Order");
const Product = require("../../models/Product");

/*
 * Add to Cart
 */
const add = async (req, res) => {
  const { productid } = req.body;

  product = await Product.findById(productid);

  if (!product) return res.status(404).json({ msg: "Product Not Found" });

  try {
    // Add new Cart item
    order = new Order({
      user: req.user.id,
      product: product,
      status: false,
    });

    // Save to DB (Commit)
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * Remove to Cart
 */
const remove = async (req, res) => {
  try {
    order = await Order.findById(req.params.id);

    // Check if the order is found or not
    if (!order) return res.status(404).json({ msg: "Order Not Found" });

    // Check if the order id belongs to the logged in user
    if (order.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Delete the item
    await order.remove();

    res.json({ msg: "Order removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * Get all cart items
 */
const cartItems = async (req, res) => {
  try {
    order = await Order.find({ user: req.user.id, status: false });

    res.json(order);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

module.exports = { add, remove, cartItems };
