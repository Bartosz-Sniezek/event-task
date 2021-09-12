import { useEffect, useState } from "react";
import { getEvents } from "../api/events";
import { Spinner } from "../components/ui/Spinner";
import { EventDTO } from "../core/EventDTO";
import { EventTable } from "../event/EventTable";
import { getErrorMessage } from "../utils/getErrorMessage";

import "./_default.css";

export function Events() {
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

  return (
    <div className="pos-relative view">
      <div>
        <button onClick={loadEvents}>refresh</button>
      </div>
      {!loading && <EventTable items={events}/>}
      {loading && <Spinner />}
    </div>
  );
}
