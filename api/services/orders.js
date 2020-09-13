const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Detail = require("../../models/Detail");
const nodemailer = require("nodemailer");

/*
 * Add to Cart
 */
const add = async (req, res) => {
  const { productid } = req.body;

  try {
    product = await Product.findById(productid);

    if (!product) return res.status(404).json({ msg: "Product Not Found" });

    // Check if product already added to cart
    order = await Order.findOne({
      user: req.user.id,
      product: product,
      status: false,
    });
    if (order) return res.status(400).json({ msg: "Already added to cart" });

    // Add new Cart item
    order = new Order({
      user: req.user.id,
      product: productid,
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
    order = await Order.find({ user: req.user.id, status: false }).populate(
      "product",
      "title image price"
    );
    res.json(order);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * Check Out
 */
const checkout = async (req, res) => {
  try {
    order = await Order.find({ user: req.user.id, status: false }).populate(
      "product",
      "title price"
    );

    if (order.length === 0)
      return res.status(404).json({ msg: "Cart is Empty" });

    const { name, email } = req.body;

    detail = new Detail({
      name,
      email,
      user: req.user.id,
    });

    // Save details
    await detail.save();

    await Order.updateMany(
      { user: req.user.id, status: false },
      { $set: { status: true, details: detail } }
    );

    // Send Order confirmation mail to User
    await sendMail(order, name, email);

    res.json({ msg: "Mail Sent Successfuly" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

/*
 * All Orders
 */
const allOrders = async (req, res) => {
  try {
    var orders = [];
    detail = await Detail.find().sort({
      createdAt: -1,
    });
    for (var i in detail) {
      orders.push(
        await Order.find({ details: detail[i]._id })
          .populate("details", "email")
          .populate("product", "title")
      );
    }

    res.json(orders);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }

  return res;
};

// Send Mail
const sendMail = async (order, name, email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let price = 0;
  let msg = "Hi " + name + "\n";
  msg += "Your following orders are placed:\n";

  for (var i in order) {
    msg += order[i].product.title + "\n";
    price += order[i].product.price;
  }

  msg += "Total Amount : " + price;

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Order Details",
    text: msg,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = { add, remove, cartItems, checkout, allOrders };
