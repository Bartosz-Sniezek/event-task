export abstract class ValueObject<T> {
  protected _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }
}