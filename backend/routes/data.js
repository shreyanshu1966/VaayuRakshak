// routes/data.js
const express = require('express');
const router = express.Router();
const GasReading = require('../models/GasReading');  // Mongoose model
const UserLocation = require('../models/UserLocation'); // User location model
const { sendAlert } = require('../utils/alerts');    // SOS alert system

router.post('/upload', async (req, res) => {
  try {
    const { gasLevel, latitude, longitude, timestamp } = req.body;

    if (
      gasLevel === undefined || gasLevel === null ||
      latitude === undefined || longitude === undefined || !timestamp
    ) {
      return res.status(400).json({ success: false, message: "Missing gasLevel, latitude, longitude, or timestamp" });
    }

    if (typeof gasLevel !== 'number' || gasLevel < 0) {
      return res.status(400).json({ success: false, message: "Invalid gasLevel. Must be a non-negative number." });
    }

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ success: false, message: "Invalid latitude or longitude. Must be numbers." });
    }

    // Validate timestamp format (basic ISO 8601 check)
    if (isNaN(Date.parse(timestamp))) {
      return res.status(400).json({ success: false, message: "Invalid timestamp format. Must be ISO 8601 string." });
    }

    const location = { latitude, longitude };
    const reading = new GasReading({ gasLevel, location, timestamp: new Date(timestamp) });
    await reading.save();

    // Example: Trigger alert if above threshold
    const threshold = 100;
    if (gasLevel > threshold) {
      await sendAlert(location, gasLevel);
    }

    res.json({ success: true, message: "Data received and logged." });
  } catch (error) {
    console.error("Upload error:", error.stack || error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// New endpoint to add user location and phone number
router.post('/users', async (req, res) => {
  try {
    const { phoneNumber, location } = req.body;

    if (!phoneNumber || !location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
      return res.status(400).json({ success: false, message: "Missing phoneNumber or location coordinates" });
    }

    // Validate phone number format (simple regex for example)
    const phoneRegex = /^\+\d{10,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ success: false, message: "Invalid phone number format" });
    }

    // Upsert user location by phoneNumber
    const user = await UserLocation.findOneAndUpdate(
      { phoneNumber },
      { location },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, message: "User location saved", user });
  } catch (error) {
    console.error("User location save error:", error.stack || error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;

    const logs = await GasReading.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.json({ success: true, logs });
  } catch (error) {
    console.error("Fetch logs error:", error.stack || error);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
