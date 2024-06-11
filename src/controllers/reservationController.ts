import { Response } from 'express';
import { ReservationService } from '../services/reservationService';
import { AuthenticatedRequest } from '../types/express';

const reservationService = new ReservationService();

export const getReservations = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reservations = await reservationService.getReservationsByUser(req.user?.userId!);
    res.status(200).json(reservations);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelReservation = async (req: AuthenticatedRequest, res: Response) => {
  const { reservationId } = req.params;
  try {
    await reservationService.cancelReservation(Number(reservationId), req.user?.userId!);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
