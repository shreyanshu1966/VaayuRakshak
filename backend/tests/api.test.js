 const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dataRoutes = require('../routes/data');
require('dotenv').config({ path: './.env.test' });

const app = express();
app.use(express.json());
app.use('/api', dataRoutes);

beforeAll(async () => {
  if (!process.env.MONGO_URI && !process.env.MONGO_URI_TEST) {
    throw new Error('MONGO_URI or MONGO_URI_TEST environment variable must be set');
  }
  await mongoose.connect(process.env.MONGO_URI_TEST || process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/users', () => {
  it('should save user location with valid data', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        phoneNumber: '+911234567890',
        location: { lat: 12.9716, lng: 77.5946 }
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('User location saved');
  });

  it('should return 400 for missing fields', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ phoneNumber: '+911234567890' });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 for invalid location format', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ phoneNumber: '+911234567890', location: { lat: 'invalid', lng: 77.5946 } });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
});

describe('POST /api/upload', () => {
  it('should save gas reading with valid data', async () => {
    const res = await request(app)
      .post('/api/upload')
      .send({
        gasLevel: 50,
        location: { lat: 12.9716, lng: 77.5946 }
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Data received and logged.');
  });

  it('should trigger alert for gasLevel above threshold', async () => {
    const res = await request(app)
      .post('/api/upload')
      .send({
        gasLevel: 150,
        location: { lat: 12.9716, lng: 77.5946 }
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  it('should return 400 for missing fields', async () => {
    const res = await request(app)
      .post('/api/upload')
      .send({ gasLevel: 50 });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 for invalid location format', async () => {
    const res = await request(app)
      .post('/api/upload')
      .send({ gasLevel: 50, location: { lat: 12.9716, lng: 77.5946 } });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
  });
});
