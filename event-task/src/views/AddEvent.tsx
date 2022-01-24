import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEvent } from "../api/events";
import { Email } from "../core/Email";
import { EventDate } from "../core/EventDate";
import { FirstName } from "../core/FirstName";
import { LastName } from "../core/LastName";
import { EventForm } from "../event/EventForm";

export function AddEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    }
  }, [])

  const sendForm = (
    firstName: FirstName,
    lastName: LastName,
    email: Email,
    eventDate: EventDate,
    clearForm: () => void
  ) => {
    setLoading(true);
    addEvent(firstName!, lastName!, email!, eventDate!)
      .then(() => {
        setError(null);
        clearForm();
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        if (mounted.current) {
          setLoading(false);
        }
      });
  };

  return (
    <div className="add-event-container">
      <EventForm onSubmit={sendForm} />
    </div>
  );
}
