const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  fullName: String,
  bank: String,
  category: { type: String, enum: ['cashback','rewards','travel','premium','student'] },
  annualFee: Number,
  feeWaiver: String,
  minIncome: Number,
  minIncomeLabel: String,
  minCreditScore: Number,
  applyLink: String,
  imageUrl: String,
  tag: String,
  network: String,
  metal: Boolean,
  g1: String, g2: String, g3: String,
  chip: String, accent: String, logo: String,
  keyBenefits: [String],
  bestFor: [String],
  highlightColor: String,
  lightColor: String,
});

module.exports = mongoose.model('Card', CardSchema);
