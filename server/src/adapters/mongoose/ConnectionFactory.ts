import { ConnectionFactory } from "../../interfaces/ConnectionFactory";
import mongoose from "mongoose";
import { Provider } from "../../interfaces/Provider";
import { eventSchema } from "./models/Event";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";

@injectable()
export class MongooseConnectionFactory implements ConnectionFactory<mongoose.Connection> {
  private connection: mongoose.Connection | null;
  private readonly connectionString: string;

  constructor(@inject(TYPES.MongooseConnectionStringProvider) connectionStringProvider: Provider<string>) {
    this.connection = null;
    this.connectionString = connectionStringProvider.get();
  }

  private async isConnectionOpen(): Promise<boolean> {
    return this.connection?.readyState === 1 ?? false;
  }

  private defineModels() {
    this.connection?.model("event", eventSchema);
  }

  async create(): Promise<mongoose.Connection> {
    const isReady = await this.isConnectionOpen();

    if(!isReady) {
      this.connection?.close();
      this.connection = mongoose.createConnection(this.connectionString);
      this.defineModels();
    }

    return this.connection!;
  }

}