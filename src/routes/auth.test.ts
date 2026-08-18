import request from 'supertest';
import app from '../app';

describe('POST /api/v1/auth/register', () => {
  it('should reject an invalid email', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test User', email: 'not-an-email', password: '12345678' });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('error');
  });

  it('should reject a short password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Test User', email: 'validtest@example.com', password: '123' });

    expect(response.status).toBe(400);
  });
});