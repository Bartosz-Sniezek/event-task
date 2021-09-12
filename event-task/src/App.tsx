import "./App.css";
import { Events } from "./views/Events";
import { AddEvent } from "./views/AddEvent";
import { EventForm } from "./event/EventForm";
import { addEvent, getEvents } from "./api/events";
import { Email } from "./core/Email";
import { EventDate } from "./core/EventDate";
import { FirstName } from "./core/FirstName";
import { LastName } from "./core/LastName";
import { useEffect, useState } from "react";
import { Spinner } from "./components/ui/Spinner";
import { EventDTO } from "./core/EventDTO";
import { EventTable } from "./event/EventTable";
import { getErrorMessage } from "./utils/getErrorMessage";

export default function App() {
  const [formLoading, setFormLoading] = useState(false);
  const [showFormSendSuccesMessage, setShowFormSendSuccesMessage] =
    useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [events, setEvents] = useState<EventDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
      setError(null);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const sendForm = (
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    eventDate: EventDate,
    clearForm: () => void
  ) => {
    setFormLoading(true);
    addEvent(firstName!, lastName!, email!, eventDate!)
      .then(() => {
        setFormError(null);
        clearForm();
        loadEvents();
      })
      .catch((error) => {
        setFormError(error.message);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="pos-relative">
        <div className="app-event-form-container">
          <EventForm error={formError} onSubmit={sendForm} />
        </div>
        {formLoading && <Spinner />}
      </div>
      {/* <AddEvent /> */}
      <div className="pos-relative app-event-table">
        <div>
          <button onClick={loadEvents}>refresh</button>
        </div>
        {!loading && <EventTable items={events} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}
