import { CustomError } from './custom-error';

export class ConflictError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
