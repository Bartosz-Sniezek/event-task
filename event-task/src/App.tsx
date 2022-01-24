import "./App.css";
import { Events } from "./views/Events";
import { AddEvent } from "./views/AddEvent";
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from "react-router-dom";
import { MyLink } from "./components/ui/MyLink";

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <MyLink to='/' name='Events' />
          <MyLink to='/event/new' name='Add event' />
        </header>
        <div className="app-body">
          <Routes>
            <Route path='/event/new' element={<AddEvent />} />
            <Route path='/' element={<Events />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
