import { Event } from "../entities/Event";
import { connectionFactory, eventRepository } from "./config/db";


describe("event", () => {

  beforeEach(async () => {
    const connection = await connectionFactory.create();
    await connection.db?.dropDatabase();
  });
  
  afterAll(async () => {
    const connection = await connectionFactory.create();
    await connection.close();
  });

  test("can be created correctly", async () => {
    await expect(
      eventRepository.add(
        Event.createFrom(
          "2134",
          "bartek",
          "sniezek",
          "bartek@sniezek.pl",
          123456789
        )
      )
    ).resolves.not.toThrow();
  });

  test("event documents should have 1 item after adding new event", async () => {
    await eventRepository.add(
      Event.createFrom("9654", "sss", "aaa", "bartek@sniezek.pl", 123456789)
    );
    const events = await eventRepository.getAll();
    expect(events.length).toBe(1);
  });
});
