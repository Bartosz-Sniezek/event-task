import { useState } from "react";
import { LastName } from "../core/LastName";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useLastName(): [LastName | null, (value: string) => void, string | null, () => void, () => void] {
  const [lastName, setLastName] = useState<LastName | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(
    null
  );

  const changeLastNameHandler = (value: string) => {
    try {
      const lastName = new LastName(value);
      setLastName(lastName);
      setLastNameError(null);
    } catch (error) {
      setLastNameError(getErrorMessage(error));
    }
  }

  const validate = () => {
    if(!lastName) {
      setLastNameError("Last name can't be empty");
    }
  }

  const toInitalState = () => {
    setLastName(null);
    setLastNameError(null);
  }

  return [lastName, changeLastNameHandler, lastNameError, validate, toInitalState];
}