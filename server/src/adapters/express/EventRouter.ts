import { IRouter, Router } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { EventController } from "./interfaces/EventController";
import { ExpressRouter } from "./interfaces/ExpressRouter";

@injectable()
export class EventRouter implements ExpressRouter {
  private readonly router: IRouter;
  private readonly eventController: EventController;

  constructor(@inject(TYPES.EventController) eventController: EventController) {
    this.router = Router();
    this.eventController = eventController;
    this.setRoutes();
  }

  setRoutes() {
    this.router.post("/", this.eventController.addEvent);
    this.router.get("/", this.eventController.getAllEvents);
  }

  getRouter(): IRouter {
    return this.router;
  }
}
