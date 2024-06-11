import { Router } from 'express';
import { cancelReservation, getReservations } from '../controllers/reservationController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticateToken, getReservations);
router.delete('/:reservationId', authenticateToken, cancelReservation);

export default router;
