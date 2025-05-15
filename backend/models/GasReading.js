// models/GasReading.js
const mongoose = require('mongoose');

const GasReadingSchema = new mongoose.Schema({
  gasLevel: Number,
  location: {
    latitude: Number,
    longitude: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GasReading', GasReadingSchema);
