import { AppDataSource } from '../data-source';
import { Event } from '../models/Event';

export class EventService {
  private eventRepository = AppDataSource.getRepository(Event);

  async createEvent(name: string, date: Date, availableAttendeesCount: number, description: string, category: string) {
    const event = new Event();
    event.name = name;
    event.date = date;
    event.availableAttendeesCount = availableAttendeesCount;
    event.description = description;
    event.category = category;
    return this.eventRepository.save(event);
  }

  async findEvents() {
    return this.eventRepository.find();
  }

  async findEventById(id: number) {
    return this.eventRepository.findOneBy({ id });
  }
}
