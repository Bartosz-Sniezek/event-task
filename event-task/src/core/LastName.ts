import { isEmpty } from "../utils/isEmpty";

export class LastName {
  private _value: string;

  constructor(value: string) {
    if(isEmpty(value)) {
      throw new Error("Last name can't be empty.");
    }

    this._value = value;
  }

  public get value(): string {
    return this._value;
  }
}