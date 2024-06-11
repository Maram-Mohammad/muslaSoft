import request from 'supertest';
import { app } from '../src/app'; // Assuming your Express app is exported from src/app.ts
import { AppDataSource } from '../src/data-source';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('User Registration', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not create a user with an existing email', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });
});
