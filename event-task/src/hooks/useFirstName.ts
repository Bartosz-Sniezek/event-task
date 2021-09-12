import { useState } from "react";
import { FirstName } from "../core/FirstName";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useFirstName(): [FirstName | null, (value: string) => void, string | null, () => void, () => void] {
  const [firstName, setFirstName] = useState<FirstName | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(
    null
  );

  const changeFirstNameHandler = (value: string) => {
    try {
      const firstName = new FirstName(value);
      setFirstName(firstName);
      setFirstNameError(null);
    } catch (error) {
      console.log("firstNameError:", error);
      setFirstNameError(getErrorMessage(error));
    }
  }

  const validate = () => {
    if(!firstName) {
      setFirstNameError("First name can't be empty");
    }
  }

  const toInitalState = () => {
    setFirstName(null);
    setFirstNameError(null);
  }

  return [firstName, changeFirstNameHandler, firstNameError, validate, toInitalState];
}