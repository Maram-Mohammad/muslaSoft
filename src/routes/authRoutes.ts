import { Router } from 'express';
import { authenticateUser } from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate a user.
 *     description: This endpoint allows users to authenticate and receive a Bearer token.
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The user's credentials.
 *         schema:
 *           $ref: '#/definitions/Credentials'
 *     responses:
 *       '200':
 *         description: OK
 *         headers:
 *           Authorization:
 *             type: string
 *       '401':
 *         description: Unauthorized
 *     tags:
 *       - users
 */
router.post('/', authenticateUser);

export default router;
