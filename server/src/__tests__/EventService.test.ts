import { connectionFactory, eventService } from "./config/db";

describe("DefaultEventService tests", () => {
  beforeEach(async () => {
    const connection = await connectionFactory.create();
    await connection.db?.dropDatabase();
  });
  
  afterAll(async () => {
    const connection = await connectionFactory.create();
    await connection.close();
  });

  it("should create and store new event", async () => {
    await expect(
      eventService.create("Bartek", "Sniezek", "example@domain.com", 1234456)
    ).resolves.toBeDefined();
  });

  it("should get back same event as created from service", async () => {
    const event = await eventService.create(
      "Bartek",
      "Sniezek",
      "example@domain.com",
      1234456
    );
    const getEvent = await eventService.getById(event.id);
    expect(event.compare(getEvent!)).toBe(true);
  });

  it("should return null when trying to get non existing resource", async () => {
    const event = await eventService.getById("some-id");

    expect(event).toBe(null);
  });
});
