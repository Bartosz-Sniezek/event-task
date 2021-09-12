import { Response } from "express";
import { injectable } from "inversify";
import { UnknownError } from "../../errors/UnknownError";
import { ErrorType } from "../../utils/ErrorTypes";
import { isError } from "../../utils/validators";
import { ErrorHandler } from "./interfaces/ErrorHandler";

@injectable()
export class DefaultErrorHandler implements ErrorHandler {
  private createErrorResponse(error: Error) {
    return {
      message: error.message,
    };
  }

  handle<T extends Response>(error: unknown, response: T): void {
    const err: Error = isError(error) ? (error as Error) : new UnknownError();
    switch (err.name) {
      case ErrorType.FIELD_NOT_EXIST:
        response.status(400).send(this.createErrorResponse(err));
        break;
      case ErrorType.INVALID_TYPE:
        response.status(400).send(this.createErrorResponse(err));
        break;
      case ErrorType.INVALID_REQUEST_BODY:
        response.status(400).send(this.createErrorResponse(err));
        break;
      case ErrorType.UNKNOWN_ERROR:
        response.status(400).send(this.createErrorResponse(err));
        break;
      case ErrorType.VALIDATION_ERROR:
        response.status(400).send(this.createErrorResponse(err));
        break;
      default:
        response.status(500).send({
          message: "Internal server error.",
        });
    }
  }
}
