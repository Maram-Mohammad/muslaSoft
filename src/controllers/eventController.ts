import { Request, Response } from 'express';
import { EventService } from '../services/eventService';

const eventService = new EventService();

export const createEvent = async (req: Request, res: Response) => {
  const { name, date, availableAttendeesCount, description, category } = req.body;
  try {
    const event = await eventService.createEvent(name, date, availableAttendeesCount, description, category);
    res.status(201).json(event);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await eventService.findEvents();
    res.json(events);
} catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await eventService.findEventById(Number(id));
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
} catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
