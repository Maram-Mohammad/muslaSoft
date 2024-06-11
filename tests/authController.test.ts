// tests/authController.test.ts
import request from 'supertest';
import app from '../src/index'; // Import your Express app

describe('Auth Controller', () => {
  it('should authenticate a user', async () => {
    const response = await request(app)
      .post('/auth')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
