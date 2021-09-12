import { injectable } from "inversify";
import { Provider } from "../../interfaces/Provider";

@injectable()
export class EnvConnectionStringProvider implements Provider<string> {
  get(): string {
    return process.env.MONGODB_URI!;
  }
}
