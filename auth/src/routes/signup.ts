import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import { DatabaseConnectionError } from '../errors/database-connection.error';
import { NotFoundError } from '../errors/not-found-error';
import { User } from '../models/user';
import { ConflictError } from '../errors/conflict-error';
import { BadRequestError } from '../errors/bad-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(20).required(),
      });
      const { error, value } = schema.validate(req.body);

      const { email, password } = req.body;

      if (error) {
        throw new BadRequestError(error.message);
      }

      console.log('Create a user');

      const exsitingUser = await User.findOne({ where: { email } });

      if (exsitingUser) {
        throw new ConflictError('Email is already in use');
      }

      const user = User.build({ email, password });
      await user.save();

      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!,
      );

      req.session = { jwt: userJwt };

      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  },
);

export { router as signupRouter };
