const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cards', require('./routes/cards'));
app.use('/api/analyse', require('./routes/analyse'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'CC Analyser API running' }));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    // Seed data on startup
    require('./seedData');
    app.listen(process.env.PORT, () => console.log(`🚀 Server running on http://localhost:${process.env.PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
