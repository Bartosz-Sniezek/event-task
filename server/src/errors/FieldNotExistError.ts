import { ErrorType } from "../utils/ErrorTypes";

export class FieldNotExistError extends Error {
  constructor(property: string) {
    super(`Missing '${property}' field`);
    this.name = ErrorType.FIELD_NOT_EXIST;
  }
}