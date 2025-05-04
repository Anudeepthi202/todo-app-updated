import { useState, useEffect } from "react";

export default function TaskForm({ onTaskCreated, editingTask, onUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [recurrence, setRecurrence] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate?.substring(0, 10)); // Format YYYY-MM-DD
      setRecurrence(editingTask.recurrence?.type || "");
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setRecurrence("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      dueDate,
      recurrence: recurrence ? { type: recurrence } : undefined,
    };

    if (editingTask) {
      task._id = editingTask._id;
      onUpdate(task);
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        const newTask = await res.json();
        onTaskCreated(newTask);
      } catch (err) {
        console.error("Error creating task:", err);
      }
    }

    setTitle("");
    setDescription("");
    setDueDate("");
    setRecurrence("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        className="w-full border p-2 rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="w-full border p-2 rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        className="w-full border p-2 rounded"
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
      >
        <option value="">No Recurrence</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
