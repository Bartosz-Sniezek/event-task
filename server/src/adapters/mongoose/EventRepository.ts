import { Event } from "../../entities/Event";
import { ConnectionFactory } from "../../interfaces/ConnectionFactory";
import { EventRepository } from "../../interfaces/EventRepository";
import mongoose from "mongoose";
import { EventType } from "./models/Event";
import { TYPES } from "../../types";
import { inject, injectable } from "inversify";

@injectable()
export class MongooseEventRepository implements EventRepository {
  private readonly connectionFactory: ConnectionFactory<mongoose.Connection>;

  constructor(@inject(TYPES.ConnectionFactory) connectionFactory: ConnectionFactory<mongoose.Connection>) {
    this.connectionFactory = connectionFactory;
  }

  async getById(id: string): Promise<Event | null> {
    const EventModel = await this.getEventModel();
    const event = await EventModel.findOne({id}).exec();

    return event === null ? null : Event.createFrom(event.id, event.firstName, event.lastName, event.emailAddress, event.eventTimestamp);
  }

  private async getEventModel(): Promise<mongoose.Model<EventType, {}, {}>> {
    const conn = await this.connectionFactory.create();

    return conn.model("event"); 
  }

  async add(event: Event): Promise<void> {
    const EventModel = await this.getEventModel();
    const newEvent = new EventModel({
      id: event.id,
      firstName: event.firstName,
      lastName: event.lastName,
      emailAddress: event.emailAddress,
      eventTimestamp: event.eventTimestmap
    });

    await newEvent.save();
  }

  async getAll(): Promise<Event[]> {
    const EventModel = await this.getEventModel();
    const events = await EventModel.find().exec();

    return events.map(event => Event.createFrom(event.id, event.firstName, event.lastName, event.emailAddress, event.eventTimestamp));
  }
}