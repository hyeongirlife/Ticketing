import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface UserPayload {
  id: string;
  email: string;
}
//! typescript가 express에게 request.currentUser 속성을 정의해준 것.
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
//!! jwt token을 해독하여 req.currentUser에 저장하는 미들웨어
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
