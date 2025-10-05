const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/products', async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "Winter Jacket",
        price: 200,
        category: "Apparel",
        variants: [
          { color: "Black", size: "S", stock: 8 },
          { color: "Gray", size: "M", stock: 12 }
        ]
      },
      {
        name: "Running Shoes",
        price: 120,
        category: "Footwear",
        variants: [
          { color: "Red", size: "8", stock: 15 },
          { color: "Blue", size: "9", stock: 10 }
        ]
      }
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: "Sample products added!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/products/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
