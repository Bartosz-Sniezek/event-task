import logo from '../../logo.svg';

import "./Spinner.css"

export function Spinner() {
  return <div className="spinner-container">
    <img src={logo} className="App-logo" alt="loading..."/>
  </div>
}