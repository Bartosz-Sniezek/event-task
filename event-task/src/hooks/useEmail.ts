import { useState } from "react";
import { Email } from "../core/Email";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useEmail(): [Email | null, (value: string) => void, string | null, () => void, () => void] {
  const [emailAddress, setEmailAddress] = useState<Email | null>(null);
  const [emailAddressError, setEmailAddressError] = useState<string | null>(
    null
  );

  const changeEmailHandler = (value: string) => {
    try {
      const email = new Email(value);
      setEmailAddress(email);
      setEmailAddressError(null);
    } catch (error) {
      setEmailAddressError(getErrorMessage(error));
    }
  }

  const validate = () => {
    if(!emailAddress) {
      setEmailAddressError("Email address can't be empty");
    }
  }

  const toInitalState = () => {
    setEmailAddress(null);
    setEmailAddressError(null);
  }

  return [emailAddress, changeEmailHandler, emailAddressError, validate, toInitalState];
}