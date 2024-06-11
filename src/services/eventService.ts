import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Event } from '../models/Event';

interface CreateEventDTO {
  name: string;
  date: string;
  availableAttendeesCount: number;
  description: string;
  category: string;
}

interface GetEventsQuery {
  name?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
}

export class EventService {
  private eventRepository: Repository<Event>;

  constructor() {
    this.eventRepository = AppDataSource.getRepository(Event);
  }

  async createEvent(eventData: CreateEventDTO) {
    
    const event = this.eventRepository.create(eventData);
    await this.eventRepository.save(event);
    return event;
  }

  async getEvents(query: GetEventsQuery) {
    const { name, startDate, endDate, category } = query;

    const where: any = {};
    if (name) {
      where.name = name;
    }
    if (startDate) {
      where.date = { $gte: new Date(startDate) };
    }
    if (endDate) {
      where.date = { $lte: new Date(endDate) };
    }
    if (category) {
      where.category = category;
    }

    const events = await this.eventRepository.find({ where });
    return events;
  }
}
