import { EventDTO } from "../core/EventDTO";
import { EventTableRow } from "./EventTableRow";

import "./EventTable.css";

interface EventListProps {
  items: EventDTO[] | null;
}

export function EventTable(props: EventListProps) {
  return (
    <div>
      {props.items == null && <div>No events</div>}
      {props.items && props.items.length == 0 && <div>No events</div>}
      {props.items && props.items.length > 0 && (
        <table className="event-table">
          <caption>Event table</caption>
          <thead>
            <tr className="event-table-header-row">
              <th>id</th>
              <th>first name</th>
              <th>last name</th>
              <th>email</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {props.items!.map((event) => {
              return <EventTableRow
                  key={event.id}
                  id={event.id}
                  firstName={event.firstName}
                  lastName={event.lastName}
                  emailAddress={event.emailAddress}
                  eventTimestamp={event.eventTimestamp}
                />
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
