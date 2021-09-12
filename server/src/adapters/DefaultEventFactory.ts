import { inject, injectable } from "inversify";
import { Event } from "../entities/Event";
import { EventFactory } from "../interfaces/EventFactory";
import { IdGenerator } from "../interfaces/IdGenerator";
import { TYPES } from "../types";

@injectable()
export class DefaultEventFactory implements EventFactory {
  private readonly idGenerator: IdGenerator;

  constructor(@inject(TYPES.IdGenerator) idGenerator: IdGenerator) {
    this.idGenerator = idGenerator;
  }

  async create(
    firstName: string,
    lastName: string,
    email: string,
    date: number
  ): Promise<Event> {
    const newId = this.idGenerator.generate();

    return new Event(newId, firstName, lastName, email, date);
  }
}
