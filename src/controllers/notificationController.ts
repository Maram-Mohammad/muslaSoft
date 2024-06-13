import { Request, Response } from 'express';
import { NotificationService } from '../services/notificationService';

const notificationService = new NotificationService();

export const sendNotificationController = async (req: Request, res: Response) => {
  const { eventId, message, date } = req.body;
  try {
    console.log(eventId, message, date);
    await notificationService.createNotificationSchedule(eventId, message, new Date(date));
    res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Failed to send notification', error: error.message });
  }
};


export const getNotificationLogsController = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    try {
      const logs = await notificationService.getLoggedNotifications(Number(eventId));
      res.status(200).json({ success: true, logs });
    } catch (error: any) {
      res.status(500).json({ success: false, message: 'Failed to retrieve notification logs', error: error.message });
    } 
}

