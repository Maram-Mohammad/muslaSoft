// src/types/express.d.ts
import { Request } from 'express';

interface UserPayload {
  userId: number;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}
