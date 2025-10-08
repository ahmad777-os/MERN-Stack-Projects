const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

router.post('/', async (req, res) => {
  try {
    const { userId, orderId, message } = req.body;
    const notification = new Notification({
      userId,
      orderId,
      message,
      createdAt: new Date()
    });
    await notification.save();
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send notification' });
  }
});

module.exports = router;
