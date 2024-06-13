import { validateOrReject } from 'class-validator';
import * as cron from 'node-cron';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Event } from '../models/Event';
import { NotificationLog } from '../models/NotificationLog';
import { NotificationSchdule } from '../models/schduledNotifications';


export class NotificationService {
    private eventRepository: Repository<Event>;
    private notificationLogRepository: Repository<NotificationLog>;
    private notificationScheduleRepository: Repository<NotificationSchdule>;

  constructor() {
    this.notificationLogRepository = AppDataSource.getRepository(NotificationLog);
    this.eventRepository = AppDataSource.getRepository(Event);
    this.notificationScheduleRepository = AppDataSource.getRepository(NotificationSchdule);

  }

  async createNotificationSchedule(eventId: number, message: string, date: Date) {
    const schedule = {
      eventId,
      message,
      date,
      status: 'scheduled',
    };

    console.log("createNotificationSchedule>>>>>>>>>>>>>>>>>>>>> ", schedule)
    try {
      const newSchedule = this.notificationScheduleRepository.create(schedule);
  
      console.log(newSchedule);
  
      await validateOrReject(newSchedule).catch(errors => {
        console.log("HELLO IN VALIDATION ERROR >>>>>>>>>>>>>>>>>", errors);
        throw new Error('Validation failed: ' + errors);
      });
  
      console.log(newSchedule);
  
      await this.notificationScheduleRepository.save(newSchedule);
      return newSchedule;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getLoggedNotifications(eventId: number) {
    const logs = await this.notificationLogRepository.find({ where:{eventId}});
    return logs;
  }

  private async checkAndSendScheduledNotifications(){    
    const now = new Date();
    
    const scheduledNotifications: NotificationSchdule[] = await this.notificationScheduleRepository.find({
      where: {
        status: 'scheduled',
        date: now,
      },
    });
  
    for (const schedule of scheduledNotifications) {
      try{
        let event: Event = await this.eventRepository.findOneOrFail({ where:{ id: schedule.eventId } });
        // Log the notification
        if(event){
          for (const reservation of event.reservations) {
            const user = reservation.user;
            if (user) {
              console.log(`Notifying user ${user.email} about event ${event.name}`);
              await this.logNotification(user.id, event.id, `Notified user ${user.email} about event ${event.name}`);
            }
          }
        }
        schedule.status = 'sent';
        // schedule.statusMessage = 'Success';
        await this.notificationScheduleRepository.save(schedule);
      }
      catch(error: any){
        console.log("there is no Event for Scheduled Notification so it is failed")
        schedule.status = 'failed';
        // schedule.statusMessage = 'no event found';
        await this.notificationScheduleRepository.save(schedule);
        continue;
      }
    }
  }

  private async logNotification(userId: number, eventId: number, message: string) {
    const log = this.notificationLogRepository.create({ userId, eventId, message });
    await this.notificationLogRepository.save(log);
  }

  scheduleNotifications() {
    cron.schedule('*/1 * * * *', async () => {
      console.log('Running notification task');
      await this.sendNotifications();
      await this.checkAndSendScheduledNotifications();
    });
  }

  private async sendNotifications() {
    const now = new Date();
    // Discard seconds and minutes
    now.setSeconds(0, 0);  
  
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
          console.log(`Notifying user ${user.email} about event ${event.name}`);
          await this.logNotification(user.id, event.id, `Notified user ${user.email} about event ${event.name}`);
        }
      }
    }
  }


  
}
