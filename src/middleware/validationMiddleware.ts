import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validationMiddleware<T>(type: any): (req: Request, res: Response, next: NextFunction) => void {
  return async (req, res, next) => {
    const validationObj = Object.assign(new type(), req.body);
    const errors = await validate(validationObj);
    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      next();
    }
  };
}
