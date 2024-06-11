import { Response } from 'express';
import { ReservationService } from '../services/ticketService';
import { AuthenticatedRequest } from '../types/express';

const reservationService = new ReservationService();

export const reserveTicket = async (req: AuthenticatedRequest, res: Response) => {
  const { eventId } = req.body;
  try {
    const reservation = await reservationService.reserveTicket(req.user?.userId!, eventId);
    res.status(201).json(reservation);
} catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getReservationsByUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reservations = await reservationService.findReservationsByUser(req.user?.userId!);
    res.json(reservations);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const cancelReservation = async (req: AuthenticatedRequest, res: Response) => {
  const { reservationId } = req.params;
  try {
    const reservation = await reservationService.cancelReservation(Number(reservationId));
    res.json(reservation);
} catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
