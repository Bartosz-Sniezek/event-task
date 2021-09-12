import "reflect-metadata";
import { Container } from "inversify";
import { DefaultEventFactory } from "./adapters/DefaultEventFactory";
import { DefaultEventService } from "./adapters/DefaultEventService";
import { EnvConnectionStringProvider } from "./adapters/mongoose/ConnectionStringProvider";
import { MongooseEventRepository } from "./adapters/mongoose/EventRepository";
import { UuidGenerator } from "./adapters/UuidGenerator";
import { EventFactory } from "./interfaces/EventFactory";
import { EventRepository } from "./interfaces/EventRepository";
import { EventService } from "./interfaces/EventService";
import { IdGenerator } from "./interfaces/IdGenerator";
import { Provider } from "./interfaces/Provider";
import { TYPES } from "./types";
import { ExpressHttpsServer } from "./adapters/express/HttpServer";
import { Server } from "./interfaces/Server";
import { PostEventBodyRequestValidator } from "./adapters/express/PostEventBodyRequestValidator";
import {
  AddEventBodyRequest,
  DefaultEventController,
} from "./adapters/express/controllers/event";
import { Validator } from "./interfaces/Validator";
import { DefaultErrorHandler } from "./adapters/express/DefaultErrorHandler";
import { ErrorHandler } from "./adapters/express/interfaces/ErrorHandler";
import { EventController } from "./adapters/express/interfaces/EventController";
import { ExpressRouter } from "./adapters/express/interfaces/ExpressRouter";
import { EventRouter } from "./adapters/express/EventRouter";
import { ConnectionFactory } from "./interfaces/ConnectionFactory";
import mongoose from "mongoose";
import { MongooseConnectionFactory } from "./adapters/mongoose/ConnectionFactory";

const container = new Container();

container.bind<IdGenerator>(TYPES.IdGenerator).to(UuidGenerator);
container.bind<EventFactory>(TYPES.EventFactory).to(DefaultEventFactory);
container
  .bind<EventRepository>(TYPES.EventRepository)
  .to(MongooseEventRepository);
container.bind<EventService>(TYPES.EventService).to(DefaultEventService);
container
  .bind<Provider<string>>(TYPES.MongooseConnectionStringProvider)
  .to(EnvConnectionStringProvider);
container
  .bind<ConnectionFactory<mongoose.Connection>>(TYPES.ConnectionFactory)
  .to(MongooseConnectionFactory);
container.bind<Server>(TYPES.Server).to(ExpressHttpsServer);
container
  .bind<Validator<AddEventBodyRequest>>(TYPES.AddEventBodyRequestValidator)
  .to(PostEventBodyRequestValidator);
container
  .bind<ErrorHandler>(TYPES.AddEventErrorHandler)
  .to(DefaultErrorHandler);
container
  .bind<EventController>(TYPES.EventController)
  .to(DefaultEventController);
container.bind<ExpressRouter>(TYPES.EventRouter).to(EventRouter);

export { container };
