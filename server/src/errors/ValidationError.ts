import { ErrorType } from "../utils/ErrorTypes";

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorType.VALIDATION_ERROR;
  }
}