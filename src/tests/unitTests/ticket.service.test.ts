import { AppDataSource } from '../../data-source';
import { Event } from '../../models/Event';
import { Reservation } from '../../models/Reservation';
import { User } from '../../models/User';
import { TicketService } from '../../services/ticketService';

jest.mock('../../data-source');

describe('TicketService', () => {
  let ticketService: TicketService;
  let userRepository: any;
  let eventRepository: any;
  let reservationRepository: any;

  beforeAll(() => {
    userRepository = {
      findOne: jest.fn(),
    };
    eventRepository = {
      findOne: jest.fn(),
    };
    reservationRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };
    AppDataSource.getRepository = jest.fn().mockImplementation((model) => {
      if (model === User) return userRepository;
      if (model === Event) return eventRepository;
      if (model === Reservation) return reservationRepository;
    });
    ticketService = new TicketService();
  });

  describe('reserveTickets', () => {
    it('should reserve tickets for an event', async () => {
      const user = { id: 1, email: 'john@example.com' };
      const event = { id: 1, name: 'Concert' };
      const reservation = { id: 1, attendeesCount: 2, user, event };

      userRepository.findOne.mockResolvedValueOnce(user);
      eventRepository.findOne.mockResolvedValueOnce(event);
      reservationRepository.create.mockReturnValueOnce(reservation);
      reservationRepository.save.mockResolvedValueOnce(reservation);

      const result = await ticketService.reserveTickets(1, 2, 1);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(eventRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(reservationRepository.create).toHaveBeenCalledWith({ attendeesCount: 2, user, event });
      expect(reservationRepository.save).toHaveBeenCalledWith(reservation);
      expect(result).toEqual(reservation);
    });

    it('should throw an error if user not found', async () => {
      userRepository.findOne.mockResolvedValueOnce(null);

      await expect(ticketService.reserveTickets(1, 2, 1)).rejects.toThrow('User not found');
    });

    it('should throw an error if event not found', async () => {
      const user = { id: 1, email: 'john@example.com' };
      userRepository.findOne.mockResolvedValueOnce(user);
      eventRepository.findOne.mockResolvedValueOnce(null);

      await expect(ticketService.reserveTickets(1, 2, 1)).rejects.toThrow('Event not found');
    });
  });
});
