import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';
  constructor(public message: string = 'Error connecting to database') {
    super(message);
    this.message = this.reason;
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
