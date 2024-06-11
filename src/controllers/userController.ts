import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.createUser({ name, email, password });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
