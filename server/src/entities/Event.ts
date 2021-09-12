import { ValidationError } from "../errors/ValidationError";
import { EventDTO } from "../transport/EventDTO";
import { isEmailAddress, isEmpty } from "../utils/validators";

export class Event {
  private readonly _id: string;
  private readonly _firstName: string;
  private readonly _lastName: string;
  private readonly _emailAddress: string;
  private readonly _eventTimestamp: number;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    eventTimestamp: number
  ) {
    this.checkFistName(firstName);
    this.checkLastName(lastName);
    this.checkEmail(emailAddress);
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._emailAddress = emailAddress;
    this._eventTimestamp = eventTimestamp;
  }

  private checkFistName(firstName: string) {
    if (isEmpty(firstName)) {
      throw new ValidationError("First name can't be empty.");
    }
  }

  private checkLastName(lastName: string) {
    if (isEmpty(lastName)) {
      throw new ValidationError("Last name can't be empty.");
    }
  }

  private checkEmail(email: string) {
    if (isEmpty(email)) {
      throw new ValidationError("Email address can't be empty.");
    }

    if (!isEmailAddress(email)) {
      throw new ValidationError("Invalid email address.");
    }
  }

  public static createFrom(
    id: string,
    firstName: string,
    lastName: string,
    emailAddress: string,
    eventTimestamp: number
  ): Event {
    return new Event(id, firstName, lastName, emailAddress, eventTimestamp);
  }

  public get id(): string {
    return this._id;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get emailAddress(): string {
    return this._emailAddress;
  }

  public get eventTimestmap(): number {
    return this._eventTimestamp;
  }

  public compare(other: Event): boolean {
    return (
      this._id === other._id &&
      this._firstName === other._firstName &&
      this._lastName === other._lastName &&
      this._emailAddress === other._emailAddress &&
      this._eventTimestamp === other._eventTimestamp
    );
  }

  public toDTO(): EventDTO {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      emailAddress: this.emailAddress,
      eventTimestamp: this.eventTimestmap
    };
  }
}
