import { DefaultEventFactory } from "../../adapters/DefaultEventFactory";
import { DefaultEventService } from "../../adapters/DefaultEventService";
import { DefaultEventController } from "../../adapters/express/controllers/event";
import { DefaultErrorHandler } from "../../adapters/express/DefaultErrorHandler";
import { EventRouter } from "../../adapters/express/EventRouter";
import { ExpressHttpsServer } from "../../adapters/express/HttpServer";
import { PostEventBodyRequestValidator } from "../../adapters/express/PostEventBodyRequestValidator";
import { MongooseConnectionFactory } from "../../adapters/mongoose/ConnectionFactory";
import { MongooseEventRepository } from "../../adapters/mongoose/EventRepository";
import { TestingConnectionStringProvider } from "../../adapters/mongoose/TestingConnectionStringProvider";
import { UuidGenerator } from "../../adapters/UuidGenerator";

const postEventBodyRequestValidator = new PostEventBodyRequestValidator();
const errorHandler = new DefaultErrorHandler();
const idGenerator = new UuidGenerator();
const eventFactory = new DefaultEventFactory(idGenerator);
const testConnectionStringProvider = new TestingConnectionStringProvider();
const connectionFactory = new MongooseConnectionFactory(
  testConnectionStringProvider
);
const eventRepository = new MongooseEventRepository(connectionFactory);
const eventService = new DefaultEventService(eventRepository, eventFactory);
const eventController = new DefaultEventController(
  eventService,
  postEventBodyRequestValidator,
  errorHandler
);
const eventRouter = new EventRouter(eventController);
const server = new ExpressHttpsServer(eventRouter);

export {
  postEventBodyRequestValidator,
  errorHandler,
  idGenerator,
  eventFactory,
  testConnectionStringProvider,
  connectionFactory,
  eventRepository,
  eventService,
  eventController,
  eventRouter,
  server
};
