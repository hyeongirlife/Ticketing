// 외부에서 호출할 수 없고, 내부에서 모든 에러를 핸들링할 수 있도록 만든 클래스.
export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
  }
}
