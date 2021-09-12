import { Request, Response } from "express";

export interface EventController {
  addEvent(req: Request<any, any, any, any>, res: Response): Promise<void>;
  getAllEvents(req: Request<any, any, any, any>, res: Response): Promise<void>;
}