import { inject, injectable } from "inversify";
import { Event } from "../entities/Event";
import { EventFactory } from "../interfaces/EventFactory";
import { EventRepository } from "../interfaces/EventRepository";
import { EventService } from "../interfaces/EventService";
import { TYPES } from "../types";

@injectable()
export class DefaultEventService implements EventService {
  private readonly eventRepository: EventRepository;
  private readonly eventFactory: EventFactory;

  constructor(
   @inject(TYPES.EventRepository) eventRepository: EventRepository,
   @inject(TYPES.EventFactory) eventFactory: EventFactory
  ) {
    this.eventRepository = eventRepository;
    this.eventFactory = eventFactory;
  }
  
  async create(firstName: string, lastName: string, email: string, date: number): Promise<Event> {
    const event = await this.eventFactory.create(firstName, lastName, email, date);
    await this.eventRepository.add(event);
    
    return event;
  }
  
  async getAll(): Promise<Event[]> {
    return await this.eventRepository.getAll();
  }
  
  async getById(id: string): Promise<Event | null> {
    return await this.eventRepository.getById(id);
  }
}