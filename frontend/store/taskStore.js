import { create } from 'zustand'
import axios from 'axios'

const useTaskStore = create((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const res = await axios.get("http://localhost:5000/api/tasks")
    set({ tasks: res.data })
  },
  addTask: async (task) => {
    const res = await axios.post("http://localhost:5000/api/tasks", task)
    set((state) => ({ tasks: [...state.tasks, res.data] }))
  },
  updateTask: async (id, task) => {
    const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, task)
    set((state) => ({
      tasks: state.tasks.map(t => t.id === id ? res.data : t)
    }))
  },
  deleteTask: async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`)
    set((state) => ({
      tasks: state.tasks.filter(t => t.id !== id)
    }))
  }
}));

export default useTaskStore;

