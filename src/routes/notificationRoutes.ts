// routes/notificationRoutes.ts
import express from 'express';
import { getNotificationLogs, getScheduledNotifications, scheduleNotification } from '../controllers/notificationController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { NotificationSchedule } from '../models/schduledNotifications';

const router = express.Router();

router.post('/', [authenticateToken, validationMiddleware(NotificationSchedule)], scheduleNotification);
router.get('/:eventId/logs', [authenticateToken], getNotificationLogs);
router.get('/:eventId/scheduled', getScheduledNotifications); // New route

export default router;

