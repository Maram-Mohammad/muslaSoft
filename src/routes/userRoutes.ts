import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { User } from '../models/User';
import { validationMiddleware } from '../middleware/validationMiddleware';

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     description: This endpoint allows customers to create a new user.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad request
 *     tags:
 *       - users
 */
router.post('/', validationMiddleware(User), createUser);

export default router;
