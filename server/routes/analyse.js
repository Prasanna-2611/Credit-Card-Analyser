const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

router.post('/', async (req, res) => {
  try {
    const { income, hasCard, expenses } = req.body;
    const cards = await Card.find({});

    const online = (expenses?.online_shopping || 0) + (expenses?.groceries || 0) + (expenses?.dining || 0);
    const travel = expenses?.travel || 0;
    const lifestyle = (expenses?.lifestyle || 0) + (expenses?.movies || 0);
    const monthlyTotal = Object.values(expenses || {}).reduce((a, b) => a + b, 0);
    const annualTotal = monthlyTotal * 12;

    const scoreCard = (card) => {
      if (card.minIncome > 0 && income < card.minIncome) return -1;
      let s = 40;
      if (card.annualFee === 0) s += 15;
      else if (card.annualFee <= 1000) s += 10;
      else if (card.annualFee <= 3000) s += 6;
      else if (card.annualFee <= 6000) s += 3;

      if (['sbi-cashback','axis-cashback'].includes(card.id) && online > 8000) s += 25;
      if (card.id === 'hsbc-live' && ((expenses?.dining||0)+(expenses?.groceries||0)) > 8000) s += 25;
      if (card.id === 'hdfc-millennia' && online > 5000) s += 18;
      if (card.id === 'hdfc-millennia-travel' && travel > 3000) s += 14;
      if (['hsbc-travelone','idfc-diamond-reserve'].includes(card.id) && travel > 5000) s += 28;
      if (card.id === 'axis-atlas' && income >= 900000 && travel > 5000) s += 26;
      if (card.id === 'idfc-wow' && travel > 2000) s += 20;
      if (card.id === 'idfc-wow-student' && income < 300000) s += 22;
      if (['amazon-pay-icici','amazon-pay-student'].includes(card.id) && online > 4000) s += 18;
      if (card.id === 'hdfc-regalia-gold' && annualTotal > 200000) s += 20;
      if (['hdfc-infinia','icici-emeralde-private','axis-magnus'].includes(card.id) && income >= 1800000 && annualTotal > 500000) s += 35;
      if (card.id === 'idfc-private' && income >= 3000000) s += 40;
      if (lifestyle > 5000 && ['hdfc-millennia','hdfc-regalia-gold'].includes(card.id)) s += 12;
      if (hasCard === 'no' && card.annualFee === 0) s += 18;
      if (hasCard === 'no' && ['idfc-wow-student','amazon-pay-student'].includes(card.id)) s += 22;
      if (income < 300000 && card.annualFee === 0) s += 10;

      return Math.min(99, Math.round(s));
    };

    const ranked = cards
      .map(c => ({ ...c.toObject(), score: scoreCard(c) }))
      .filter(c => c.score >= 0)
      .sort((a, b) => b.score - a.score);

    res.json({ success: true, count: ranked.length, data: ranked });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
