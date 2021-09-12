import "./SubmitButton.css";

interface SubmitButtonProps {
  text: string;
  onClick?: () => void;
  disabled: boolean;
}

export function SubmitButton(props: SubmitButtonProps) {
  return (
    <input
      className="submit-button"
      type="submit"
      value={props.text}
      disabled={props.disabled}
      onClick={props.onClick}
    />
  );
}
