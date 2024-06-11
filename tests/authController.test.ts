import request from 'supertest';
import { app } from '../src/app';

describe('User Authentication', () => {
  it('should authenticate a user with valid credentials', async () => {
    const res = await request(app)
      .post('/auth')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not authenticate a user with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth')
      .send({
        email: 'john@example.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message');
  });
});
