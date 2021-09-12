import { Email } from "../core/Email";
import { EventDate } from "../core/EventDate";
import { EventDTO } from "../core/EventDTO";
import { FirstName } from "../core/FirstName";
import { LastName } from "../core/LastName";
import { ErrorResponse, PostNewEvent } from "./types";

function prepareEventDto(
  firstName: FirstName,
  lastName: LastName,
  emailAddress: Email,
  eventDate: EventDate
): PostNewEvent {
  return {
    firstName: firstName.value,
    lastName: lastName.value,
    emailAddress: emailAddress.value,
    eventTimestamp: eventDate.value,
  };
}

export async function addEvent(
  firstName: FirstName,
  lastName: LastName,
  emailAddress: Email,
  eventDate: EventDate
): Promise<void> {
  const body = JSON.stringify(
    prepareEventDto(firstName, lastName, emailAddress, eventDate)
  );

  const response = await fetch(process.env.REACT_APP_EVENT_API_URI!, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
  });

  if (response.status === 500) {
    throw new Error("An error occurred during making request");
  }

  let responseBody = await response.json();

  if (response.status !== 201) {
    throw new Error((responseBody as ErrorResponse).message);
  }
}

export async function getEvents(): Promise<EventDTO[]> {
  const response = await fetch(process.env.REACT_APP_EVENT_API_URI!, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  });

  if (response.status === 500) {
    throw new Error("An error occurred during making request");
  }

  let responseBody = await response.json();

  if (response.status !== 200) {
    throw new Error((responseBody as ErrorResponse).message);
  } else {
    return responseBody;
  }
}
