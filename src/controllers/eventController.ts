import { Request, Response } from 'express';
import { EventService } from '../services/eventService';

const eventService = new EventService();

export const createEvent = async (req: Request, res: Response) => {
  const { name, date, availableAttendeesCount, description, category } = req.body;
  try {
    const event = await eventService.createEvent({ name, date, availableAttendeesCount, description, category });
    res.status(201).json({ eventId: event.id });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  const { name, startDate, endDate, category } = req.query;

  try {
    const events = await eventService.getEvents({
      name: name as string,
      startDate: startDate as string,
      endDate: endDate as string,
      category: category as string,
    });
    res.status(200).json(events);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
