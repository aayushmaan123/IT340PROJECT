const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
