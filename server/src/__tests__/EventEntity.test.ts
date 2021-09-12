import { Event } from "../entities/Event";
import { ValidationError } from "../errors/ValidationError";

const id = "1111-2222-4444-5555";
const firstName = "Bartek";
const lastName = "Śnieżek";
const validEmail = "example@domain.com";
const invalidEmail ="@domail.com";
const date = 12345678;
const EMPTY_STRING = "";

describe("Event entity tests", () => {
  it("should create event when all fields are valid", () => {
    expect(() => new Event("12345", "Bartek", "Śnieżek", "bartosz.sniezek@outlook.com", 123456789)).not.toThrow();
  });

  it("should throw ValidationError on empty first name", () => {
    expect(() => new Event(id, EMPTY_STRING, lastName, validEmail, date)).toThrowError(ValidationError);
  });

  it("should throw ValidationErorr on empty last name", () =>{ 
    expect(() => new Event(id, firstName, EMPTY_STRING, validEmail, date)).toThrowError(ValidationError);
  });

  it("should throw ValidationErorr on empty email", () =>{ 
    expect(() => new Event(id, firstName, lastName, EMPTY_STRING, date)).toThrowError(ValidationError);
  });

  it("should throw ValidationErorr on invalid email", () =>{ 
    expect(() => new Event(id, firstName, lastName, invalidEmail, date)).toThrowError(ValidationError);
  });
});