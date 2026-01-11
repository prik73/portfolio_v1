const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const crypto = require('crypto');

const Visit = require('./models/Visit');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

// API route
app.get('/api/visits', async (req, res) => {
  try {
    const ipHash = crypto.createHash('sha256').update(req.ip).digest('hex');
    const userAgent = req.headers['user-agent'];
    const path = req.originalUrl;
    const referrer = req.get('Referrer') || 'Direct';

    const visit = new Visit({
      ipHash,
      userAgent,
      path,
      referrer
    });

    await visit.save();

    const count = await Visit.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
