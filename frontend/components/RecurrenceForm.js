import { useState } from "react";

export default function RecurrenceForm({ onChange }) {
  const [type, setType] = useState("");

  const handleChange = (e) => {
    setType(e.target.value);
    onChange({ type: e.target.value });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Recurrence</label>
      <select
        value={type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="">No Recurrence</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
}
