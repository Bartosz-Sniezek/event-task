import { ErrorType } from "../utils/ErrorTypes";

export class UnknownError extends Error {
  constructor() {
    super("An unexpected error occurred");
    this.name = ErrorType.UNKNOWN_ERROR;
  }
}