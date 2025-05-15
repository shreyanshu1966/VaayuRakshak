require('dotenv').config({ path: './.env.test' });

const request = require('supertest');
const app = require('../index').app || require('../index'); // Adjust for exported app or server
const mongoose = require('mongoose');
const GasReading = require('../models/GasReading');

describe('GET /api/logs', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    await GasReading.deleteMany({});
    await GasReading.insertMany([
      {
        gasLevel: 50,
        location: { latitude: 12.34, longitude: 56.78 },
        timestamp: new Date('2023-01-01T10:00:00Z'),
      },
      {
        gasLevel: 150,
        location: { latitude: 23.45, longitude: 67.89 },
        timestamp: new Date('2023-01-02T10:00:00Z'),
      },
    ]);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return logs with default limit', async () => {
    const res = await request(app).get('/api/logs');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.logs)).toBe(true);
    expect(res.body.logs.length).toBeGreaterThan(0);
  });

  it('should return logs with specified limit and skip', async () => {
    const res = await request(app).get('/api/logs?limit=1&skip=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.logs.length).toBe(1);
  });

  it('should handle invalid limit and skip gracefully', async () => {
    const res = await request(app).get('/api/logs?limit=abc&skip=xyz');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
