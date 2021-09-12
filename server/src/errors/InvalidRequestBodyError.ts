import { ErrorType } from "../utils/ErrorTypes";

export class InvalidRequestBodyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.INVALID_REQUEST_BODY
  }
}