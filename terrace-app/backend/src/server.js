const express = require('express');
const cors = require('cors');

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const miscRouter = require('./routes/misc');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api', miscRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Terracè API running', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🏺 Terracè API running on http://localhost:${PORT}`);
  console.log(`   GET  /api/products`);
  console.log(`   GET  /api/products/featured`);
  console.log(`   GET  /api/products/:id`);
  console.log(`   POST /api/orders`);
  console.log(`   POST /api/contact`);
  console.log(`   POST /api/newsletter\n`);
});
