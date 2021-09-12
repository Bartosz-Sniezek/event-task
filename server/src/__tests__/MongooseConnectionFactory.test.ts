import { connectionFactory } from "./config/db";

it("should return open mongodb connection", async () => {
  const connection = await connectionFactory.create();
  
  connection.on("connection", () => {
    expect(connection.readyState).toBe(1);
  });
});
