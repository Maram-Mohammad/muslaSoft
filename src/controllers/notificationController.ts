import { Request, Response } from 'express';
import { NotificationService } from '../services/notificationService';

const notificationService = new NotificationService();

export const scheduleNotification = async (req: Request, res: Response) => {
  const { eventId, message, date } = req.body;
  try {
    await notificationService.createNotificationSchedule(eventId, message, new Date(date));
    res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to send notification', error: error.message });
  }
};

export const getNotificationLogs = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    try {
      const logs = await notificationService.getLoggedNotifications(Number(eventId));
      res.status(200).json({ success: true, logs });
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Failed to retrieve notification logs', error: error.message });
    } 
}



export const getScheduledNotifications = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  try {
    const notifications = await notificationService.getScheduledNotifications(parseInt(eventId));
    res.status(200).json(notifications);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
