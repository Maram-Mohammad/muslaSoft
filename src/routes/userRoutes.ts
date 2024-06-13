import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { User } from '../models/User';

const router = Router();

router.post('/', validationMiddleware(User), createUser);

export default router;
