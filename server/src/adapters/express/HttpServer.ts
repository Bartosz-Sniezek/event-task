import { Server } from "../../interfaces/Server";
import express from "express";
import cors from "cors";
import { inject, injectable } from "inversify";
import { ExpressRouter } from "./interfaces/ExpressRouter";
import { TYPES } from "../../types";
import { RequestListener } from "http";

@injectable()
export class ExpressHttpsServer implements Server {
  private readonly app: express.Express;
  private readonly eventRouter: ExpressRouter;

  constructor(
    @inject(TYPES.EventRouter) eventRouter: ExpressRouter
  ) {
    this.eventRouter = eventRouter;
    this.app = express();
    this.setMiddleware();
    this.setRoutes();
  }

  private setMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setRoutes(): void {
    this.app.use("/api/events", this.eventRouter.getRouter());
  }

  listen(port: number, callback: () => void): void {
    this.app.listen(port, callback);
  }

  getRequestListener(): RequestListener {
    return this.app;
  }

}