import { IRouter } from "express";

export interface ExpressRouter {
  getRouter(): IRouter;
}