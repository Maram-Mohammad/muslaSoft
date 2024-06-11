import request from 'supertest';
import { app } from '../src/app';

describe('Event Creation', () => {
  let token: string;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    token = res.body.token;
  });

  it('should create a new event', async () => {
    const res = await request(app)
      .post('/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Concert',
        date: '2024-07-20T19:00:00Z',
        availableAttendeesCount: 100,
        description: 'A great concert',
        category: 'Concert',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not create an event with invalid data', async () => {
    const res = await request(app)
      .post('/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Concert',
        date: 'invalid date',
        availableAttendeesCount: 100,
        description: 'A great concert',
        category: 'Concert',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });
});

describe('Event Search and Reservation', () => {
    let token: string;
  
    beforeAll(async () => {
      const res = await request(app)
        .post('/auth')
        .send({
          email: 'john@example.com',
          password: 'password123',
        });
      token = res.body.token;
    });
  
    it('should search for events', async () => {
      const res = await request(app)
        .get('/events?name=Concert')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
    });
  
    it('should reserve tickets for an event', async () => {
      const eventRes = await request(app)
        .post('/events')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Conference',
          date: '2024-08-20T19:00:00Z',
          availableAttendeesCount: 100,
          description: 'A great conference',
          category: 'Conference',
        });
  
      const res = await request(app)
        .post(`/events/${eventRes.body.id}/tickets`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          attendeesCount: 2,
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });
  });
  
