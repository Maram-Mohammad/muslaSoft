import request from 'supertest';
import { app } from '../../app';

describe('Event Creation', () => {
  let token: string;

  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Event User',
        email: 'event@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/auth')
      .send({
        email: 'event@example.com',
        password: 'password123',
      });

    token = res.body.token;
  });

  it('should create a new event', async () => {
    const response = await request(app)
      .post('/events')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Concert',
        date: '2024-06-12 19:00:00',
        availableAttendeesCount: 100,
        description: 'A great concert',
        category: 'Concert',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('eventId');
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

  it('should get all events', async () => {
    const response = await request(app)
      .get('/events')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
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



      expect(eventRes.status).toBe(201);
      expect(eventRes.body).toHaveProperty('eventId');
      const eventId = eventRes.body.eventId;

    const res = await request(app)
      .post(`/events/${eventId}/tickets`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        attendeesCount: 2,
      });


    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });
});







