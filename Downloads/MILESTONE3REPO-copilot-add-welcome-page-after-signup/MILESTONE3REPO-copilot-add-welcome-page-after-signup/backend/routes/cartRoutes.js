const express = require('express');
const Cart = require('../models/cart');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// POST /api/cart/add
router.post('/add', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: 'Product ID required' });

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
  } else {
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (item) {
      item.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }
  }
  await cart.save();
  res.json({ message: 'Added to cart' });
});

// DELETE /api/cart/remove
router.delete('/remove', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ message: 'Product ID required' });

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(item => item.productId.toString() !== productId);
  await cart.save();
  res.json({ message: 'Removed from cart' });
});

// GET /api/cart
router.get('/', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  if (!cart) return res.json({ items: [] });
  res.json({ items: cart.items });
});

module.exports = router;
