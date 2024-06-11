import { Router } from 'express';
import { cancelReservation, getReservationsByUser, reserveTicket } from '../controllers/ticketController';

const router = Router();

router.post('/reserve', reserveTicket);
router.get('/reservations/:userId', getReservationsByUser);
router.delete('/reservations/:reservationId', cancelReservation);

export default router;
