import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Reservation } from '../models/Reservation';

export class ReservationService {
  private reservationRepository: Repository<Reservation>;

  constructor() {
    this.reservationRepository = AppDataSource.getRepository(Reservation);
  }

  async getReservationsByUser(userId: number) {
    return this.reservationRepository.find({
      where: { user: { id: userId } },
      relations: ['event', 'user'],
    });
  }

  async cancelReservation(reservationId: number, userId: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: reservationId, user: { id: userId } },
    });

    if (!reservation) {
      throw new Error('Reservation not found');
    }

    await this.reservationRepository.remove(reservation);
  }
}
