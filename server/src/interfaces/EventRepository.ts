import { Event } from "../entities/Event";

export interface EventRepository {
  add(event: Event): Promise<void>;
  getAll(): Promise<Event[]>;
  getById(id: string): Promise<Event | null>;
}
