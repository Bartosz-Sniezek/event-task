import "./Button.css";

interface Props {
    onClick: () => void;
    text: string;
}

export function Button(props: Props) {
    return <button className="my-button" onClick={props.onClick}>{props.text}</button>
}
