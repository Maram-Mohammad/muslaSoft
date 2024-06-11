import request from 'supertest';
import { app } from '../src/app';

describe('View and Cancel Reservations', () => {
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

  it('should view booked events for a user', async () => {
    const res = await request(app)
      .get('/reservations')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should cancel a reservation', async () => {
    const reservationRes = await request(app)
      .post(`/events/1/tickets`)  // Replace with actual event ID
      .set('Authorization', `Bearer ${token}`)
      .send({
        attendeesCount: 2,
      });

    const res = await request(app)
      .delete(`/reservations/${reservationRes.body.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
