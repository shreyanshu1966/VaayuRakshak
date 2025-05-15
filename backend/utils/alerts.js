const axios = require('axios');
const UserLocation = require('../models/UserLocation');

const EARTH_RADIUS_KM = 6371;

// Haversine formula to calculate distance between two lat/lon points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const deg2rad = (deg) => deg * (Math.PI / 180);
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

const sendAlert = async (location, level) => {
  const lat = location.lat || location.latitude;
  const lng = location.lng || location.longitude;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const message = `ALERT: High gas level (${level}) detected at location: ${mapsUrl}`;

  try {
    // Find users within 5 km radius
    const users = await UserLocation.find();
    const nearbyUsers = users.filter(user => {
      const dist = getDistanceFromLatLonInKm(
        lat,
        lng,
        user.location.lat,
        user.location.lng
      );
      return dist <= 1; // 1 km radius
    });

    for (const user of nearbyUsers) {
      // Send SMS using Fast2SMS
      try {
        const smsResponse = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
          params: {
            authorization: process.env.FAST2SMS_API_KEY,
            variables_values: message,
            route: 'v3',
            numbers: user.phoneNumber
          },
          headers: {
            'cache-control': 'no-cache'
          }
        });
        console.log(`Fast2SMS response for ${user.phoneNumber}:`, smsResponse.data);
      } catch (error) {
        console.error(`Failed to send SMS to ${user.phoneNumber} via Fast2SMS:`, error);
      }

      // Make call using Exotel
      try {
        const exotelSid = process.env.EXOTEL_SID;
        const exotelToken = process.env.EXOTEL_TOKEN;
        const exotelCallerId = process.env.EXOTEL_CALLER_ID;

        const exotelUrl = `https://${exotelSid}:${exotelToken}@twilix.exotel.in/v1/Accounts/${exotelSid}/Calls/connect.json`;

        const callData = new URLSearchParams();
        callData.append('From', exotelCallerId);
        callData.append('To', user.phoneNumber);
        callData.append('Url', 'http://your-server.com/exotel-twiml'); // URL to TwiML instructions for the call

        const callResponse = await axios.post(exotelUrl, callData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        console.log(`Exotel call response for ${user.phoneNumber}:`, callResponse.data);
      } catch (error) {
        console.error(`Failed to make call to ${user.phoneNumber} via Exotel:`, error);
      }
    }
  } catch (error) {
    console.error('Error in sendAlert:', error);
  }
};

module.exports = { sendAlert };
