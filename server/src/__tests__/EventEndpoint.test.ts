import supertest from "supertest";
import { ExpressHttpsServer } from "../adapters/express/HttpServer";
import { EventRouter } from "../adapters/express/EventRouter";
import { AddEventBodyRequest, DefaultEventController } from "../adapters/express/controllers/event";
import { DefaultEventService } from "../adapters/DefaultEventService";
import { MongooseEventRepository } from "../adapters/mongoose/EventRepository";
import { MongooseConnectionFactory } from "../adapters/mongoose/ConnectionFactory";
import { TestingConnectionStringProvider } from "../adapters/mongoose/TestingConnectionStringProvider";
import { DefaultEventFactory } from "../adapters/DefaultEventFactory";
import { UuidGenerator } from "../adapters/UuidGenerator";
import { PostEventBodyRequestValidator } from "../adapters/express/PostEventBodyRequestValidator";
import { DefaultErrorHandler } from "../adapters/express/DefaultErrorHandler";
import { PrimitiveTypes } from "../utils/PrimitiveTypes";

const postEventBodyRequestValidator = new PostEventBodyRequestValidator();
const errorHandler = new DefaultErrorHandler();
const idGenerator = new UuidGenerator();
const eventFactory = new DefaultEventFactory(idGenerator);
const testConnectionStringProvider = new TestingConnectionStringProvider();
const connectionFactory = new MongooseConnectionFactory(testConnectionStringProvider);
const eventRepository = new MongooseEventRepository(connectionFactory);
const eventService = new DefaultEventService(eventRepository, eventFactory)
const eventController = new DefaultEventController(eventService, postEventBodyRequestValidator, errorHandler);
const eventRouter = new EventRouter(eventController);
const server = new ExpressHttpsServer(eventRouter);

const request = supertest(server.getRequestListener());

beforeEach(async () => {
  const connection = await connectionFactory.create();
  await connection.db?.dropDatabase();
});

afterAll(async () => {
  const connection = await connectionFactory.create();
  await connection.close();
});

it("gets the events endpoint", async () => {
  const res = await request.get("/api/events");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});

it("should return 201 on POST /api/events when request body is valid", async () => {
  const res = await request.post("/api/events").send(<AddEventBodyRequest>{
    firstName: "bartek",
    lastName: "sniezek",
    emailAddress: "test@domain.com",
    eventTimestamp: 12345
  });

  expect(res.status).toBe(201);
});

describe("missing fields in POST /api/events request tests", () => {
  it("should return 400 on POST /api/events with body.message 'Missing 'firstName' property' when 'firstName' field is missing in request body", async () => {
    const res = await request.post("/api/events").send({
      lastName: "sniezek",
      emailAddress: "test@domain.com",
      eventTimestamp: 12345
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing 'firstName' property");
  }); 
  
  it("should return 400 on POST /api/events with body.message 'Missing 'lastName' property' when 'lastName' field is missing in request body", async () => {
    const res = await request.post("/api/events").send({
      firstName: "bartek",
      emailAddress: "test@domain.com",
      eventTimestamp: 12345
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing 'lastName' property");
  }); 
  
  it("should return 400 on POST /api/events with body.message 'Missing 'emailAddress' property' when 'emailAddress' field is missing in request body", async () => {
    const res = await request.post("/api/events").send({
      firstName: "bartek",
      lastName: "sniezek",
      eventTimestamp: 12345
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing 'emailAddress' property");
  }); 
  
  it("should return 400 on POST /api/events with body.message 'Invalid email address' when 'emailAddress' field is invalid email address in request body", async () => {
    const res = await request.post("/api/events").send({
      firstName: "bartek",
      lastName: "sniezek",
      emailAddress: "2314",
      eventTimestamp: 12345
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email address.");
  }); 
  
  it("should return 400 on POST /api/events with body.message 'Missing 'eventTimestamp' property' when 'eventTimestamp' field is missing in request body", async () => {
    const res = await request.post("/api/events").send({
      firstName: "bartek",
      lastName: "sniezek",
      emailAddress: "example@domain.com"
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing 'eventTimestamp' property");
  });
});


describe("invalid POST /api/events field type tests", () => {
  it(`should return 400 with message 'Invalid field 'firstName' type. Expected: ${PrimitiveTypes.STRING}, found ${PrimitiveTypes.NUMBER}' when 'firstName' field is not a string in request body`, async () => {
    const res = await request.post("/api/events").send({
      firstName: 2132,
      lastName: "sniezek",
      emailAddress: "test@domain.com",
      eventTimestamp: 12345
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(`Invalid field 'firstName' type. Expected: ${PrimitiveTypes.STRING}, found ${PrimitiveTypes.NUMBER}`);
  }); 

  it(`should return 400 with message 'Invalid field 'lastName' type. Expected: ${PrimitiveTypes.STRING}, found ${PrimitiveTypes.BOOLEAN}' when 'lastName' field is not a string in request body`, async () => {
    const res = await request.post("/api/events").send({
      firstName: "bartek",
      lastName: true,
      emailAddress: "test@domain.com",
      eventTimestamp: 12345
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(`Invalid field 'lastName' type. Expected: ${PrimitiveTypes.STRING}, found ${PrimitiveTypes.BOOLEAN}`);
  }); 

  it(`should return 400 with message 'Invalid field 'emailAddress' type. Expected: ${PrimitiveTypes.STRING}, found ${PrimitiveTypes.BOOLEAN}' when 'emailAddress' field is not a string in request body`, async () => {
    const res = await request.post("/api/events").send({
      firstName: "bartek",
      lastName: "sniezek",
      emailAddress: false,
      eventTimestamp: 12345
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(`Invalid field 'emailAddress' type. Expected: ${PrimitiveTypes.STRING}, found ${PrimitiveTypes.BOOLEAN}`);
  });

  it(`should return 400 with message 'Invalid field 'eventTimestamp' type. Expected: ${PrimitiveTypes.NUMBER}, found ${PrimitiveTypes.BOOLEAN}' when 'eventTimestamp' field is not a number in request body`, async () => {
    const res = await request.post("/api/events").send({
      firstName: "bartek",
      lastName: "sniezek",
      emailAddress: "test@domain.com",
      eventTimestamp: false
    });
  
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(`Invalid field 'eventTimestamp' type. Expected: ${PrimitiveTypes.NUMBER}, found ${PrimitiveTypes.BOOLEAN}`);
  }); 
});
