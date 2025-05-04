export default function DatePicker({ label, value, onChange }) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium">{label}</label>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
    );
  }
  