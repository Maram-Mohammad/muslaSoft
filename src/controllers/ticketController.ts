import { Response } from 'express';
import { TicketService } from '../services/ticketService';
import { AuthenticatedRequest } from '../types/express';

const ticketService = new TicketService();

export const reserveTickets = async (req: AuthenticatedRequest, res: Response) => {
  const { eventId } = req.params;
  const { attendeesCount } = req.body;
  try {
    const reservation = await ticketService.reserveTickets(Number(eventId), attendeesCount, req.user?.userId!);
    res.status(201).json(reservation);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
