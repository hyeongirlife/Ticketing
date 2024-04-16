import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from 'cookie-session';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // traffic is being proxied to our app through ingress-nginx
app.use(express.json());
app.use(
  cookieSession({
    signed: false, // 쿠키의 암호화 해제. JWT는 이미 암호화되어 있기 때문에 false
    secure: true, // HTTPS에서만 쿠키를 전달하도록.
  }),
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);
console.log('process.env', process.env.JWT_KEY);
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log('Listening on port 3000!!!!!!!!');
});

start();
