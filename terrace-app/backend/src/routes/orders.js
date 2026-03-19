const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// In-memory order store (replace with DB in production)
const orders = [];
let orderCounter = 1000;

// POST /api/orders - place an order
router.post(
  '/',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('pincode').notEmpty().withMessage('PIN code is required'),
    body('cart').isArray({ min: 1 }).withMessage('Cart must not be empty'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { firstName, lastName, email, phone, address, city, state, pincode, cart, paymentMethod, total } = req.body;

    const order = {
      id: `TRC-${++orderCounter}`,
      placedAt: new Date().toISOString(),
      customer: { firstName, lastName, email, phone },
      shipping: { address, city, state, pincode },
      cart,
      paymentMethod,
      total,
      status: 'confirmed',
    };

    orders.push(order);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      orderId: order.id,
      data: order,
    });
  }
);

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  res.json({ success: true, data: order });
});

module.exports = router;
