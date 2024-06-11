import { Router } from 'express';
import { reserveTickets } from '../controllers/ticketController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * /events/{eventId}/tickets:
 *   post:
 *     summary: Reserve tickets for an event.
 *     description: This endpoint allows customers to reserve tickets for an event.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         description: The ID of the event to reserve tickets for.
 *         required: true
 *         type: integer
 *         format: int64
 *       - in: body
 *         name: ticketRequest
 *         description: The ticket reservation request.
 *         schema:
 *           $ref: '#/definitions/TicketRequest'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *     tags:
 *       - tickets
 *     security:
 *       - Bearer: []
 */
router.post('/events/:eventId/tickets', authenticateToken, reserveTickets);

export default router;
