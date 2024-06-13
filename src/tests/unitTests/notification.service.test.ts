import { validateOrReject } from 'class-validator';
import 'reflect-metadata';
import { AppDataSource } from '../../data-source';
import { Event } from '../../models/Event';
import { NotificationLog } from '../../models/NotificationLog';
import { NotificationSchedule } from '../../models/schduledNotifications';
import { NotificationService } from '../../services/notificationService';

jest.mock('typeorm', () => ({
  getRepository: jest.fn(),
}));
jest.mock('class-validator');

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let notificationScheduleRepository: any;
  let notificationLogRepository: any;
  let eventRepository: any;

  beforeEach(() => {
    notificationScheduleRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };
    notificationLogRepository = {
      save: jest.fn(),
      find: jest.fn(),
    };
    eventRepository = {
      findOneOrFail: jest.fn(),
    };

    AppDataSource.getRepository = jest.fn((model) => {
      if (model === NotificationSchedule) return notificationScheduleRepository;
      if (model === NotificationLog) return notificationLogRepository;
      if (model === Event) return eventRepository;
    });

    notificationService = new NotificationService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createNotificationSchedule', () => {
    it('should create and save a new notification schedule', async () => {
      const scheduleData = { eventId: 1, message: 'Reminder', date: new Date(), status: 'scheduled' };
      scheduleData.date.setSeconds(0,0);
      notificationScheduleRepository.create.mockReturnValueOnce(scheduleData);
      notificationScheduleRepository.save.mockResolvedValueOnce(scheduleData);
      (validateOrReject as jest.Mock).mockResolvedValueOnce(undefined);

      const result = await notificationService.createNotificationSchedule(1, 'Reminder', new Date());
        
      console.log("result:: ", result);

      expect(validateOrReject).toHaveBeenCalledWith(expect.any(NotificationSchedule));
      expect(notificationScheduleRepository.save).toHaveBeenCalledWith(scheduleData);
      expect(result).toEqual(scheduleData);
    });

    it('should throw an error if validation fails', async () => {
      const errors = [{ property: 'status', constraints: { isIn: 'Invalid status' } }];
      (validateOrReject as jest.Mock).mockRejectedValueOnce(errors);

      await expect(notificationService.createNotificationSchedule(1, 'Reminder', new Date())).rejects.toThrow('Validation failed: ' + JSON.stringify(errors));
    });
  });
});
