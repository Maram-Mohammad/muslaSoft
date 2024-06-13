import request from 'supertest';
import { app } from '../../app';

describe('User Registration', () => {

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Maram Farrag',
        email: 'maram@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not create a user with an existing email', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Maram Farrag',
        email: 'maram@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should authenticate a user', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        email: 'maram@example.com',
        password: 'password123',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        email: 'maram@example.com',
        password: 'wrongpassword',
      });
    expect(response.status).toBe(401);
  });
});

