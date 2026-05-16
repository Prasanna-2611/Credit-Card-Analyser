const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// GET all cards
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const cards = await Card.find(filter);
    res.json({ success: true, count: cards.length, data: cards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET card by id
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findOne({ id: req.params.id });
    if (!card) return res.status(404).json({ success: false, error: 'Card not found' });
    res.json({ success: true, data: card });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
