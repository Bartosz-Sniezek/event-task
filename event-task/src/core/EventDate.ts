export class EventDate {
  private _eventDate: number;

  constructor(input: number) {
    if(Number.isNaN(input)) {
      throw new Error("Event date can't be empty");
    }
    this._eventDate = input;
  }

  public get value(): number {
    return this._eventDate;
  }
}
