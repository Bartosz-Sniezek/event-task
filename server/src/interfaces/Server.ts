import { RequestListener } from "http";

export interface Server {
  listen(port: number, callback: () => void): void;
  getRequestListener(): RequestListener;
}
