import { EventDTO } from "../core/EventDTO";
import { getDateStringFromEpoch } from "../utils/getDateStringFromEpoch";
import "./EventTableRow.css";

export function EventTableRow({
  firstName,
  lastName,
  eventTimestamp,
  emailAddress,
  id,
}: EventDTO) {
  return (
    <tr className="event-table-row">
      <td>
        {id}
      </td>
      <td className="">
        {firstName}
      </td>
      <td className="">
        {lastName}
      </td>
      <td className="">
        {emailAddress}
      </td>
      <td className="">
        {getDateStringFromEpoch(eventTimestamp)}
      </td>
    </tr>
  );
}
