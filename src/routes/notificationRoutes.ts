// routes/notificationRoutes.ts
import express from 'express';
import { getNotificationLogsController, sendNotificationController } from '../controllers/notificationController';
import { authenticateToken } from '../middleware/authMiddleware';
import { NotificationSchdule } from '../models/schduledNotifications';
import { validationMiddleware } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/', [authenticateToken, validationMiddleware(NotificationSchdule)], sendNotificationController);
router.get('/:eventId/logs', [authenticateToken], getNotificationLogsController);

export default router;
