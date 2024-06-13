import request from 'supertest';
import { app } from '../../app';

describe.skip('View and Cancel Reservations', () => {
  let token: string;


  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Reservation User',
        email: 'reserve@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/auth')
      .send({
        email: 'reserve@example.com',
        password: 'password123',
      });

    token = res.body.token;
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

  it('should view booked events for a user', async () => {
    const res = await request(app)
      .get('/reservations')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should cancel a reservation', async () => {

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
   
    const reservRes = await request(app)
      .delete(`/reservations/${res.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(reservRes.statusCode).toEqual(204);
  });
});

