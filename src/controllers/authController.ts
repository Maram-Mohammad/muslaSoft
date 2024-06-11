import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.authenticateUser({ email, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
