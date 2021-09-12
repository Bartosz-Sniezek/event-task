import { ErrorType } from "../utils/ErrorTypes";
import { PrimitiveTypes } from "../utils/PrimitiveTypes";

export class InvalidFieldTypeError extends Error {
  constructor(fieldName: string, expected: PrimitiveTypes, found: string) {
    super(
      `Invalid field '${fieldName}' type. Expected: ${expected}, found ${found}`
    );
    this.name = ErrorType.INVALID_TYPE;
  }
}
