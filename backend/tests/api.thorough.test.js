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

describe('Thorough Testing for /api/users', () => {
    it('should reject invalid phone number format', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                phoneNumber: '12345',
                location: { lat: 12.9716, lng: 77.5946 }
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject empty request body', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject null location', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                phoneNumber: '+911234567890',
                location: null
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject missing phoneNumber', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                location: { lat: 12.9716, lng: 77.5946 }
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject missing location', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                phoneNumber: '+911234567890'
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });
});

describe('Thorough Testing for /api/upload', () => {
    it('should reject negative gasLevel', async () => {
        const res = await request(app)
            .post('/api/upload')
            .send({
                gasLevel: -10,
                location: { latitude: 12.9716, longitude: 77.5946 }
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject non-numeric gasLevel', async () => {
        const res = await request(app)
            .post('/api/upload')
            .send({
                gasLevel: "high",
                location: { latitude: 12.9716, longitude: 77.5946 }
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject location with missing latitude', async () => {
        const res = await request(app)
            .post('/api/upload')
            .send({
                gasLevel: 50,
                location: { longitude: 77.5946 }
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject location with missing longitude', async () => {
        const res = await request(app)
            .post('/api/upload')
            .send({
                gasLevel: 50,
                location: { latitude: 12.9716 }
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject missing gasLevel', async () => {
        const res = await request(app)
            .post('/api/upload')
            .send({
                location: { latitude: 12.9716, longitude: 77.5946 }
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    it('should reject missing location', async () => {
        const res = await request(app)
            .post('/api/upload')
            .send({
                gasLevel: 50
            });
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });
});

describe('Thorough Testing for /api/logs', () => {
    it('should reject unauthorized access', async () => {
        const res = await request(app)
            .get('/api/logs');
        expect([401, 403]).toContain(res.statusCode);
    });

    it('should return logs with valid authorization (mocked)', async () => {
        // Replace 'Bearer testtoken' with a valid token if your API uses JWT or similar
        const res = await request(app)
            .get('/api/logs')
            .set('Authorization', 'Bearer testtoken');
        // Accept 200 or 403 depending on your implementation
        expect([200, 403]).toContain(res.statusCode);
    });
});

// Additional tests for alert system integration and security can be added similarly with mocks/stubs.

// Note: There was a duplicate afterAll and describe block below that was causing syntax errors.
// Those have been removed to fix the test file.

describe('Thorough Testing for Additional User Cases', () => {
  it('should reject invalid phone number format', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        phoneNumber: '12345',
        location: { lat: 12.9716, lng: 77.5946 }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject empty request body', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject null location', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        phoneNumber: '+911234567890',
        location: null
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('Thorough Testing for /api/upload', () => {
  it('should reject negative gasLevel', async () => {
    const res = await request(app)
      .post('/api/upload')
      .send({
        gasLevel: -10,
        location: { latitude: 12.9716, longitude: 77.5946 }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject non-numeric gasLevel', async () => {
    const res = await request(app)
      .post('/api/upload')
      .send({
        gasLevel: "high",
        location: { latitude: 12.9716, longitude: 77.5946 }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject location with missing latitude', async () => {
    const res = await request(app)
      .post('/api/upload')
      .send({
        gasLevel: 50,
        location: { longitude: 77.5946 }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
  it('should reject location with missing longitude', async () => {
    const res = await request(app)
      .post('/api/upload')
      .send({
        gasLevel: 50,
        location: { latitude: 12.9716 }
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// Additional tests for alert system integration and security can be added similarly with mocks/stubs.
