import { Response } from "express";

export interface ErrorHandler {
  handle<T extends Response>(error: unknown, response: T): void;
}