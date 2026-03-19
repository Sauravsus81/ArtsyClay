const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const subscribers = [];
const messages = [];

// POST /api/contact
router.post(
  '/contact',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').notEmpty().withMessage('Message is required'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, email, subject, message } = req.body;
    messages.push({ name, email, subject, message, receivedAt: new Date().toISOString() });
    res.json({ success: true, message: "Thanks! We'll get back to you within 24 hours." });
  }
);

// POST /api/newsletter
router.post(
  '/newsletter',
  [body('email').isEmail().withMessage('Valid email is required')],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email } = req.body;
    if (!subscribers.includes(email)) {
      subscribers.push(email);
    }
    res.json({ success: true, message: "You're subscribed! Welcome to the Kiln Circle." });
  }
);

module.exports = router;
