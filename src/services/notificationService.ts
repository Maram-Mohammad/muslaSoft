import * as cron from 'node-cron';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Event } from '../models/Event';
import { NotificationLog } from '../models/NotificationLog';

export class NotificationService {
    private eventRepository: Repository<Event>;
    private notificationLogRepository: Repository<NotificationLog>;

  constructor() {
    this.notificationLogRepository = AppDataSource.getRepository(NotificationLog);
    this.eventRepository = AppDataSource.getRepository(Event);

  }

  async sendNotifications() {
    const now = new Date();
    // Discard seconds and minutes
    now.setSeconds(0, 0);  // Set seconds and milliseconds to zero
    // now.setMinutes(0);     // Set minutes to zero
  
    const nextHour = new Date(now.getTime() + 1* 60 * 1000);

    console.log(nextHour);
    const events = await this.eventRepository.find({
      where: {
        date: nextHour,
      },
      relations: ['reservations', 'reservations.user'],
    });

    for (const event of events) {
      for (const reservation of event.reservations) {
        const user = reservation.user;
        if (user) {
          // Replace this with actual notification logic, e.g., sending an email
          console.log(`Notifying user ${user.email} about event ${event.name}`);
          await this.logNotification(user.id, event.id, `Notified user ${user.email} about event ${event.name}`);
        }
      }
    }
  }

  async logNotification(userId: number, eventId: number, message: string) {
    const log = this.notificationLogRepository.create({ userId, eventId, message });
    await this.notificationLogRepository.save(log);
  }

  scheduleNotifications() {
    // Schedule the task to run every hour
    cron.schedule('*/1 * * * *', async () => {
      console.log('Running notification task');
      await this.sendNotifications();
    });
  }
}
