import express, { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../../../common/src/errors/bad-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post(
  '/api/users/signin',
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

      const exsitingUser = await User.findOne({ email });

      if (!exsitingUser) {
        throw new BadRequestError(
          '존재하지 않는 유저입니다. 회원가입을 진행해주세요.',
        );
      }
      const decryptedPassword = await Password.compare(
        exsitingUser.password,
        password,
      );

      if (!decryptedPassword) {
        throw new BadRequestError(
          '비밀번호가 일치하지 않습니다. 다시 입력해주세요.',
        );
      }

      const userJwt = jwt.sign(
        {
          id: exsitingUser.id,
          email: exsitingUser.email,
        },
        process.env.JWT_KEY!,
      );

      req.session = { jwt: userJwt };

      res.status(200).send(exsitingUser);
    } catch (err) {
      next(err);
    }
  },
);

export { router as signinRouter };
