const express = require("express");
const router = express.Router();

const productService = require("../services/products");

// @route    POST api/products
// @desc     Add new Product
// @access   Public

router.post("/", (req, res) => {
  return productService.add(req, res);
});

// @route    Get api/products
// @desc     Get All Todos
// @access   Public

router.get("/", (req, res) => {
  return productService.getAll(req, res);
});

module.exports = router;
