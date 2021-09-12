import { injectable } from "inversify";
import { FieldNotExistError } from "../../errors/FieldNotExistError";
import { InvalidFieldTypeError } from "../../errors/InvalidFieldTypeError";
import { InvalidRequestBodyError } from "../../errors/InvalidRequestBodyError";
import { Validator } from "../../interfaces/Validator";
import { PrimitiveTypes } from "../../utils/PrimitiveTypes";
import { AddEventBodyRequest } from "./controllers/event";

@injectable()
export class PostEventBodyRequestValidator
  implements Validator<AddEventBodyRequest>
{
  validate(input: AddEventBodyRequest): void {
    if (input.firstName == null) {
      throw new FieldNotExistError("firstName");
      // throw new InvalidRequestBodyError("Missing 'firstName' property");
    }

    if (typeof input.firstName !== PrimitiveTypes.STRING) {
      throw new InvalidFieldTypeError(
        "firstName",
        PrimitiveTypes.STRING,
        typeof input.firstName
      );
    }

    if (input.lastName == null) {
      throw new FieldNotExistError("lastName");
    }

    if (typeof input.lastName !== PrimitiveTypes.STRING) {
      throw new InvalidFieldTypeError(
        "lastName",
        PrimitiveTypes.STRING,
        typeof input.lastName
      );
    }

    if (input.emailAddress == null) {
      throw new FieldNotExistError("emailAddress");
    }

    if (typeof input.emailAddress !== PrimitiveTypes.STRING) {
      throw new InvalidFieldTypeError(
        "emailAddress",
        PrimitiveTypes.STRING,
        typeof input.emailAddress
      );
    }

    if (input.eventTimestamp == null) {
      throw new FieldNotExistError("eventTimestamp");
    }

    if (typeof input.eventTimestamp !== "number") {
      throw new InvalidFieldTypeError(
        "eventTimestamp",
        PrimitiveTypes.NUMBER,
        typeof input.eventTimestamp
      );
    }
  }
}
