import { Server } from "./interfaces/Server";
import { container } from "./inversify.config";
import { TYPES } from "./types";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8080;
const server = container.get<Server>(TYPES.Server);

server.listen( PORT, () => {
  console.log("Server is up and running on the port", PORT)
});
