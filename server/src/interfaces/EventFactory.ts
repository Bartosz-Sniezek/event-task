import { Event } from "../entities/Event";

export interface EventFactory {
  create(firstName: string, lastName: string, email: string, date: number): Promise<Event>;
}
