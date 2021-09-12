import React, { useState } from "react";
import { addEvent } from "../api/events";
import { DatePicker } from "../components/ui/DatePicker";
import { Spinner } from "../components/ui/Spinner";
import { SubmitButton } from "../components/ui/SubmitButton";
import { TextField } from "../components/ui/TextField";
import { Email } from "../core/Email";
import { EventDate } from "../core/EventDate";
import { FirstName } from "../core/FirstName";
import { LastName } from "../core/LastName";
import { useEmail } from "../hooks/useEmail";
import { useEventDate } from "../hooks/useEventDate";
import { useFirstName } from "../hooks/useFirstName";
import { useLastName } from "../hooks/useLastName";

import "./EventForm.css";

interface EventFormProps {
  onSubmit?: (firstName: FirstName, lastName: LastName, email: Email, eventDate: EventDate, clearForm: () => void) => void
  error?: string | null;
}

export function EventForm(props: EventFormProps) {
  const [email, setEmail, emailError, validateEmail, resetEmailState] =
    useEmail();
  const [
    firstName,
    setFirstName,
    firstNameError,
    validateFirstName,
    resetFirstNameState,
  ] = useFirstName();
  const [
    lastName,
    setLastName,
    lastNameError,
    validateLastName,
    resetLastNameState,
  ] = useLastName();
  const [
    eventDate,
    setEventDate,
    eventDateError,
    validateEventDate,
    resetEventDateState,
  ] = useEventDate();
  const [addEventError, setAddEventError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isFormValid = (): boolean => {
    return (
      firstName != null &&
      !firstNameError &&
      lastName != null &&
      !lastNameError &&
      email != null &&
      !emailError &&
      eventDate != null &&
      !eventDateError
    );
  };

  const clearForm = () => {
    resetFirstNameState();
    resetLastNameState();
    resetEmailState();
    resetEventDateState();
  };

  const onFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateFirstName();
    validateLastName();
    validateEmail();
    validateEventDate();
    props.onSubmit?.(firstName!, lastName!, email!, eventDate!, clearForm);
    // sendForm();
  };

  // const sendForm = () => {
  //   setLoading(true);
  //   addEvent(firstName!, lastName!, email!, eventDate!)
  //     .then(() => {
  //       setAddEventError(null);
  //       clearForm();
  //       props.onSuccess?.();
  //     })
  //     .catch((error) => {
  //       setAddEventError(error.message);
  //       props.onError?.(error.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  return (
    <div className="pos-relative event-form-container">
      <form onSubmit={onFormSubmitHandler}>
        <TextField
          value={firstName?.value}
          label="First name"
          errorMessage={firstNameError}
          onChange={setFirstName}
        />
        <TextField
          value={lastName?.value}
          label="Last name"
          errorMessage={lastNameError}
          onChange={setLastName}
        />
        <TextField
          value={email?.value}
          label="Email address"
          errorMessage={emailError}
          onChange={setEmail}
        />
        <DatePicker
          label="Event date"
          errorMessage={eventDateError}
          onChange={setEventDate}
          initialValue={eventDate?.value}
        />
        <SubmitButton disabled={!isFormValid()} text="Add" />
      {props.error && <div className="event-form-error-message">{props.error}</div>}
      </form>
      {/* {loading && <Spinner />} */}
    </div>
  );
}
