import { useEffect, useState } from "react";
import { getRecurringDates } from "../utils/recurrenceUtils";

export default function MiniCalendarPreview({ startDate, recurrence }) {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (startDate && recurrence?.type) {
      const result = getRecurringDates(startDate, recurrence.type);
      setDates(result);
    } else {
      setDates([]);
    }
  }, [startDate, recurrence]);

  return (
    <div className="mt-4 p-3 border rounded bg-gray-50">
      <h3 className="font-medium mb-2">Upcoming Dates</h3>
      <ul className="grid grid-cols-3 gap-2 text-sm">
        {dates.map((date, index) => (
          <li key={index} className="bg-white p-2 rounded shadow-sm">
            {date}
          </li>
        ))}
      </ul>
    </div>
  );
}
