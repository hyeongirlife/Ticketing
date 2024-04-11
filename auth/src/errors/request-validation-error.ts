import Joi from 'joi';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public error: Joi.ValidationError | string) {
    super('Invalid request parameters');
    if (typeof error === 'string') {
      this.message = error;
    } else {
      this.message = error.details[0].message;
    }
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
