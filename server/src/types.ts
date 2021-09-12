const TYPES = {
  ConnectionFactory: Symbol.for("ConnectionFactory"),
  EventFactory: Symbol.for("EventFactory"),
  EventRepository: Symbol.for("EventRepository"),
  IdGenerator: Symbol.for("IdGenerator"),
  EventService: Symbol.for("EventService"),
  MongooseConnectionStringProvider: Symbol.for(
    "MongooseConnectionStringProvider"
  ),
  Server: Symbol.for("Server"),
  AddEventBodyRequestValidator: Symbol.for("AddEventBodyRequestValidator"),
  AddEventErrorHandler: Symbol.for("AddEventErrorHandler"),
  EventController: Symbol.for("EventController"),
  EventRouter: Symbol.for("EventRouter")
};

export { TYPES };
