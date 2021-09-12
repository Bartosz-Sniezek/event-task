import { Event } from "../entities/Event";

export interface EventService {
  create(firstName: string, lastName: string, email: string, date: number): Promise<Event>;
  getAll(): Promise<Event[]>;
  getById(id: string): Promise<Event | null>;
}
