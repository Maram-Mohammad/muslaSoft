import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/eventController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event.
 *     description: This endpoint allows customers to create a new event.
 *     parameters:
 *       - in: body
 *         name: event
 *         description: The event to create.
 *         schema:
 *           $ref: '#/definitions/EventRequestDTO'
 *     responses:
 *       '201':
 *         description: Created
 *         schema:
 *           type: object
 *           properties:
 *             eventId:
 *               type: integer
 *               format: int64
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *     tags:
 *       - events
 *     security:
 *       - Bearer: []
 *   get:
 *     summary: Get all events or search for events.
 *     description: This endpoint allows customers to retrieve all events or search for events by name, date range, or category.
 *     parameters:
 *       - in: query
 *         name: name
 *         description: The name of the event to search for.
 *         type: string
 *       - in: query
 *         name: startDate
 *         description: The start date of the date range to search for events in (inclusive).
 *         type: string
 *         format: date
 *       - in: query
 *         name: endDate
 *         description: The end date of the date range to search for events in (inclusive).
 *         type: string
 *         format: date
 *       - in: query
 *         name: category
 *         description: The category of the event to search for.
 *         type: string
 *         enum:
 *           - Concert
 *           - Conference
 *           - Game
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/EventResponseDTO'
 *       '404':
 *         description: Not found
 *     tags:
 *       - events
 */
router.post('/', authenticateToken, createEvent);
router.get('/', getEvents);

export default router;
