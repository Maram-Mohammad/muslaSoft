import { NotificationService } from '../src/services/notificationService';
import { AppDataSource } from '../src/data-source';

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe('Notification Service', () => {
  const notificationService = new NotificationService();

  it('should send notifications for upcoming events', async () => {
    const spy = jest.spyOn(console, 'log');
    await notificationService.sendNotifications();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log notifications in the database', async () => {
    const spy = jest.spyOn(notificationService, 'logNotification');
    await notificationService.sendNotifications();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
