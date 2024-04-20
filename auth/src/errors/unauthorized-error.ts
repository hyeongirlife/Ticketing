import { CustomError } from './custom-error';

export class UnauthorizedError extends CustomError {
  statusCode = 401;
  constructor(public message: string = 'unauthorized') {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    //TypeScript에서 상속받은 클래스를 사용할 때 필요한 패턴 중 하나로, 특히 내장 Error 클래스를 확장할 때 필요한 부분입니다. 이는 instanceof 연산자가 예상대로 작동하도록 보장합니다.
  }
}
