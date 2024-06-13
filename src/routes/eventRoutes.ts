import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/eventController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { Event } from '../models/Event';

const router = Router();

router.post('/', [authenticateToken, validationMiddleware(Event)], createEvent);
router.get('/', getEvents);

export default router;
