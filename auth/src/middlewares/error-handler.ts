import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection.error';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    console.log('에러1', err);
    res.status(err.statusCode).send({ error: err.message });
    return;
  }
  console.log('에러2', err);
  res.status(400).send({ error: 'Internal Server Error' });
  return;
};
