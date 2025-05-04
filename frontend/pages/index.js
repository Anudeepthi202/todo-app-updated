import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/global.css";


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setTasks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (updatedTask) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${updatedTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      setTasks(prev => 
        prev.map(task => (task.id === data.id ? data : task))
      );
      setEditingTask(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskForm
        onTaskCreated={handleTaskCreated}
        editingTask={editingTask}
        onUpdate={handleUpdate}
      />
      <TaskList 
        tasks={tasks} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    </div>
  );
}