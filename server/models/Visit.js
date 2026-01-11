const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visitedAt: { type: Date, default: Date.now },
  ipHash: String,
  userAgent: String,
  path: String,
  referrer: String
});

module.exports = mongoose.model('Visit', visitSchema);
