import { injectable } from "inversify";
import { Provider } from "../../interfaces/Provider";

@injectable()
export class TestingConnectionStringProvider implements Provider<string> {
  get(): string {
    return process.env.MONGODB_TEST_URI!;
  }
}
