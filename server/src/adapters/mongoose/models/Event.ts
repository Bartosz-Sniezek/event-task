import mongoose from "mongoose";

export interface EventType extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  eventTimestamp: number;
}

const eventSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  emailAddress: String,
  eventTimestamp: Number
});

export { eventSchema }
