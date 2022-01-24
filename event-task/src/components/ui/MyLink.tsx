import { NavLink } from "react-router-dom";

interface Props {
    to: string;
    name: string;
}

export function MyLink(props: Props) {
    return <NavLink to={props.to} className={({ isActive }) => (isActive ? 'custom-link route-active' : 'custom-link route-inactive')}>{props.name}</NavLink>;
}
