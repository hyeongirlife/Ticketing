import express, { Request, Response } from 'express';
import joi from 'joi';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection.error';
import { NotFoundError } from '../errors/not-found-error';

const router = express.Router();

router.post('/api/users/signup', (req: Request, res: Response) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(20).required(),
  });
  const { error, value } = schema.validate(req.body);

  const { email, password } = req.body;

  if (error) {
    throw new NotFoundError();
  }

  console.log('Create a user');

  res.send({});
});

export { router as signupRouter };
