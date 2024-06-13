import { AppDataSource } from '../../data-source';
import { EventService } from '../../services/eventService';

jest.mock('../../data-source');

describe('EventService', () => {
  let eventService: EventService;
  let eventRepository: any;

  beforeAll(() => {
    eventRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };
    AppDataSource.getRepository = jest.fn().mockReturnValue(eventRepository);
    eventService = new EventService();
  });

  describe('createEvent', () => {
    it('should create and save a new event', async () => {
      const eventData = { name: 'Concert', date: '2024-06-12', availableAttendeesCount: 100, description: 'A great concert', category: 'Concert' };
      eventRepository.create.mockReturnValueOnce(eventData);
      eventRepository.save.mockResolvedValueOnce(eventData);

      const result = await eventService.createEvent(eventData);

      expect(eventRepository.create).toHaveBeenCalledWith(eventData);
      expect(eventRepository.save).toHaveBeenCalledWith(eventData);
      expect(result).toEqual(eventData);
    });
  });

  describe('getEvents', () => {
    it('should return an event by name', async () => {
      const event = [{ id: 1, name: 'MERO', date: new Date(), availableAttendeesCount: 100, description: 'A great concert', category: 'Concert' }];
      eventRepository.find.mockResolvedValue(event);

      const result = await eventService.getEvents({ name: 'MERO' });

      expect(eventRepository.find).toHaveBeenCalledWith({ where: { name: 'MERO' } });
      expect(result).toEqual(event);
    });
    })
});
