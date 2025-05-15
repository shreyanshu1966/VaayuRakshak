const mongoose = require('mongoose');

const UserLocationSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model('UserLocation', UserLocationSchema);
