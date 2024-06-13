import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { User } from '../models/User';

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await userService.createUser({ name, email, password } as User);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.message === 'Email already in use') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
