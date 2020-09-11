const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const orderService = require("../services/orders");

// @route    POST api/orders
// @desc     Add new Order
// @access   Public

router.post(
  "/",
  [auth, check("productid", "Product ID must be present").not().isEmpty()],
  (req, res) => {
    const errors = validationResult(req);

    // Throw Exception if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return orderService.add(req, res);
  }
);

// @route    DELETE api/orders/:id
// @desc     Delete Order By ID
// @access   Public

router.delete("/:id", [checkObjectId("id"), auth], (req, res) => {
  return orderService.remove(req, res);
});

// @route    Get api/orders
// @desc     Get All Cart Items
// @access   Public

router.get("/", auth, (req, res) => {
  return orderService.cartItems(req, res);
});

module.exports = router;
