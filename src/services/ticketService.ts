import { getRepository } from 'typeorm';
import { Event } from '../models/Event';
import { Reservation } from '../models/Reservation';
import { User } from '../models/User';

interface ReserveTicketsDTO {
  eventId: number;
  attendeesCount: number;
  userId: number;
}

export class TicketService {
  private reservationRepository = getRepository(Reservation);
  private userRepository = getRepository(User);
  private eventRepository = getRepository(Event);

  async reserveTickets(eventId: number, attendeesCount: number, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const event = await this.eventRepository.findOne({ where: { id: eventId } });

    if (!user) {
      throw new Error('User not found');
    }

    if (!event) {
      throw new Error('Event not found');
    }

    const reservation = this.reservationRepository.create({
      attendeesCount,
      user,
      event,
    });

    await this.reservationRepository.save(reservation);
    return reservation;
  }
}
