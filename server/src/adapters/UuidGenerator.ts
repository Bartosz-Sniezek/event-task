import { IdGenerator } from "../interfaces/IdGenerator";
import { v4 } from "uuid";
import { injectable } from "inversify";

@injectable()
export class UuidGenerator implements IdGenerator {
  generate(): string {
    return v4();
  }

}