import { Request, Response, NextFunction, response } from "express";
import { inject, injectable } from "inversify";
import { EventService } from "../../../interfaces/EventService";
import { Validator } from "../../../interfaces/Validator";
import { TYPES } from "../../../types";
import { ErrorHandler } from "../interfaces/ErrorHandler";
import { EventController } from "../interfaces/EventController";

export interface AddEventBodyRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  eventTimestamp: number;
}

@injectable()
export class DefaultEventController implements EventController {
  private readonly eventService: EventService;
  private readonly addEventRequestValidator: Validator<AddEventBodyRequest>;
  private readonly errorHandler: ErrorHandler;

  constructor(
    @inject(TYPES.EventService) eventService: EventService,
    @inject(TYPES.AddEventBodyRequestValidator) addEventRequestValidator: Validator<AddEventBodyRequest>,
    @inject(TYPES.AddEventErrorHandler) errorHandler: ErrorHandler
  ) {
    this.eventService = eventService;
    this.addEventRequestValidator = addEventRequestValidator;
    this.errorHandler = errorHandler;
  }

  getAllEvents = async (
    req: Request<any, any, any, any, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ) => {
    try {
      const events = await this.eventService.getAll();

      res.status(200).send(events.map((event) => event.toDTO()));
    } catch (error) {
      console.log(error);
      this.errorHandler.handle<Response>(error, res);
    }
  };

  addEvent = async (
    req: Request<{}, {}, AddEventBodyRequest, {}>,
    res: Response
  ) => {
    try {
      this.addEventRequestValidator.validate(req.body);
      const event = await this.eventService.create(
        req.body.firstName,
        req.body.lastName,
        req.body.emailAddress,
        req.body.eventTimestamp
      );

      res.status(201).send(event.toDTO());
    } catch (error) {
      this.errorHandler.handle(error, res);
    }
  };
}
