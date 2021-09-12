import { UuidGenerator } from "../adapters/UuidGenerator";

const uuidGenerator = new UuidGenerator();

describe("UuidGenerator tests", () => {
  it("should generate non empty string value", () => {
    const id = uuidGenerator.generate();

    expect(id.length).toBeGreaterThan(0);
  });
});