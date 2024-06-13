import { validateOrReject } from 'class-validator';
import * as cron from 'node-cron';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Event } from '../models/Event';
import { NotificationLog } from '../models/NotificationLog';
import { NotificationSchedule } from '../models/schduledNotifications';

export class NotificationService {
  private eventRepository: Repository<Event>;
  private notificationLogRepository: Repository<NotificationLog>;
  private notificationScheduleRepository: Repository<NotificationSchedule>;

  constructor() {
    this.notificationLogRepository = AppDataSource.getRepository(NotificationLog);
    this.eventRepository = AppDataSource.getRepository(Event);
    this.notificationScheduleRepository = AppDataSource.getRepository(NotificationSchedule);
  }

  async createNotificationSchedule(eventId: number, message: string, date: Date) {
    date.setSeconds(0,0);
    const schedule = new NotificationSchedule();
    schedule.eventId = eventId;
    schedule.message = message;
    schedule.date = date;
    schedule.status = 'scheduled';

    await validateOrReject(schedule).catch((errors) => {
      throw new Error('Validation failed: ' + JSON.stringify(errors));
    });

    await this.notificationScheduleRepository.save(schedule);
    return schedule;
  }

  async getLoggedNotifications(eventId: number) {
    const logs = await this.notificationLogRepository.find({ where: { eventId }, relations: ['user', 'event'] });
    return logs;
  }

  private async checkAndSendScheduledNotifications() {
    const now = new Date();
    now.setSeconds(0,0);
    console.log("NOW CHECK : ", now );
    const scheduledNotifications = await this.notificationScheduleRepository.find({
      where: {
        status: 'scheduled',
        date: now,
      },
      relations: ['event', 'event.reservations', 'event.reservations.user'],
    });

    console.log("NOW CHECKscheduledNotifications : ", scheduledNotifications );


    for (const schedule of scheduledNotifications) {
      try {
        const event = schedule.event;
        for (const reservation of event.reservations) {
          const user = reservation.user;
          if (user) {
            await this.logNotification(user.id, event.id, `Notified user ${user.email} about event ${event.name}`);
          }
        }
        schedule.status = 'sent';
        await this.notificationScheduleRepository.save(schedule);
      } catch (error) {
        schedule.status = 'failed';
        await this.notificationScheduleRepository.save(schedule);
      }
    }
  }

  private async logNotification(userId: number, eventId: number, message: string) {
    const log = new NotificationLog();
    log.userId = userId;
    log.eventId = eventId;
    log.message = message;
    log.createdAt = new Date();
    await this.notificationLogRepository.save(log);
  }

  scheduleNotifications() {
    cron.schedule('*/1 * * * *', async () => {
      await this.checkAndSendScheduledNotifications();
      await this.sendNotifications();

    });
  }

  async getScheduledNotifications(eventId: number) {
    const scheduledNotifications = await this.notificationScheduleRepository.find({
      where: { eventId, status: 'scheduled' },
      relations: ['event'],
    });
    return scheduledNotifications;
  }

  

  private async sendNotifications() {
    const now = new Date();
    now.setSeconds(0, 0);  
  
    const nextHour = new Date(now.getTime() + 1 * 60 *60 * 1000);

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
          console.log(`Notifying user ${user.email} about event ${event.name}`);
          await this.logNotification(user.id, event.id, `Notified user ${user.email} about event ${event.name}`);
        }
      }
    }
  }
  
}
