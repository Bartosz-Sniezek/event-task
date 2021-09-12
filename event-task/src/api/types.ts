export interface ErrorResponse {
  message: string;
}

export interface PostNewEvent {
  firstName: string;
  lastName: string;
  emailAddress: string;
  eventTimestamp: number;
}
