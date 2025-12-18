const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET /api/products/search?q=keyword
router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  if (!q) return res.json([]);
  const regex = new RegExp(q, 'i'); // case-insensitive
  const products = await Product.find({
    $or: [
      { name: regex },
      { category: regex },
      { description: regex }
    ]
  });
  res.json(products);
});

module.exports = router;
