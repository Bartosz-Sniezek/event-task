import React, { useEffect, useState } from "react";
import { getEpochFromDateString } from "../../utils/getEpochFromDateString";
import "./TextField.css";

interface DatePickerProps {
  initialValue?: number;
  label: string;
  onChange?: (value: number) => void;
  errorMessage?: string | null;
}

export function DatePicker(props: DatePickerProps) {
  const [value, setValue] = useState(props.initialValue ?? "");

  useEffect(() => {
    if (!props.initialValue) {
      setValue("");
    }
  }, [props.initialValue]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.onChange?.(getEpochFromDateString(event.target.value));
  };

  return (
    <div className="textfield-outer-container">
      <label className="textfield-label">
        <span className="textfield-label-text">{props.label}</span>
        <input
          className="textfield-input"
          type="date"
          onChange={onChangeHandler}
          value={value}
        />
      </label>
      {props.errorMessage && (
        <div className="textfield-error">{props.errorMessage}</div>
      )}
    </div>
  );
}
