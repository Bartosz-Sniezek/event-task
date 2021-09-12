import React, { useEffect, useState } from "react";
import "./TextField.css";

interface TextFieldProps {
  value?: string;
  label: string;
  onChange?: (value: string) => void;
  errorMessage?: string | null;
}

export function TextField(props: TextFieldProps) {
  const [value, setValue] = useState(props.value ?? "");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    props.onChange?.(event.target.value);
  };

  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);

  return (
    <div className="textfield-outer-container">
      <label className="textfield-label">
        <span className="textfield-label-text">{props.label}</span>
        <input
          className="textfield-input"
          type="text"
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
