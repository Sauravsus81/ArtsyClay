const express = require('express');
const router = express.Router();
const products = require('../data/products');

// GET /api/products - all products with optional filter & sort
router.get('/', (req, res) => {
  let list = [...products];
  const { category, sort, search } = req.query;

  if (category && category !== 'all') {
    list = list.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      p => p.name.toLowerCase().includes(q) || p.clay.toLowerCase().includes(q)
    );
  }

  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

  res.json({ success: true, count: list.length, data: list });
});

// GET /api/products/featured - first 4 products
router.get('/featured', (req, res) => {
  res.json({ success: true, data: products.slice(0, 4) });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  const related = products.filter(p => p.id !== id).slice(0, 4);
  res.json({ success: true, data: product, related });
});

module.exports = router;
