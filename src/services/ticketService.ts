import { AppDataSource } from '../data-source';
import { Reservation } from '../models/Reservation';
import { User } from '../models/User';
import { Event } from '../models/Event';

export class ReservationService {
  private reservationRepository = AppDataSource.getRepository(Reservation);

  async reserveTicket(userId: number, eventId: number) {
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    const event = await AppDataSource.getRepository(Event).findOneBy({ id: eventId });

    if (!user || !event) {
      throw new Error('User or Event not found');
    }

    if (event.availableAttendeesCount <= 0) {
      throw new Error('No tickets available');
    }

    const reservation = new Reservation();
    reservation.user = user;
    reservation.event = event;

    event.availableAttendeesCount -= 1;
    await AppDataSource.getRepository(Event).save(event);

    return this.reservationRepository.save(reservation);
  }

  async findReservationsByUser(userId: number) {
    return this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['event'],
    });
  }

  async cancelReservation(reservationId: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId },
      relations: ['event'],
    });

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    const event = reservation.event;
    event.availableAttendeesCount += 1;
    await AppDataSource.getRepository(Event).save(event);

    return this.reservationRepository.remove(reservation);
  }
}
