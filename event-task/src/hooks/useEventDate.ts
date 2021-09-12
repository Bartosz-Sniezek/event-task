import { useState } from "react";
import { EventDate } from "../core/EventDate";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useEventDate(): [EventDate | null, (value: number) => void, string | null, () => void, () => void] {
  const [eventDate, setEventDate] = useState<EventDate | null>(null);
  const [eventDateError, setEventDateError] = useState<string | null>(
    null
  );

  const changeEventDateHandler = (value: number) => {
    try {
      const eventDate = new EventDate(value);
      setEventDate(eventDate);
      setEventDateError(null);
    } catch (error) {
      setEventDateError(getErrorMessage(error));
    }
  }

  const validate = () => {
    if(!eventDate) {
      setEventDateError("Event date can't be empty");
    }
  }

  const toInitalState = () => {
    setEventDate(null);
    setEventDateError(null);
  }

  return [eventDate, changeEventDateHandler, eventDateError, validate, toInitalState];
}