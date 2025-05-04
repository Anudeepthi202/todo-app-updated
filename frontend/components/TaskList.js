export default function TaskList({ tasks, onDelete, onEdit }) {
  return (
    <div className="space-y-2 mt-4">
      <h2 className="text-lg font-bold">Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="border p-2 rounded bg-gray-100">
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Due: {new Date(task.dueDate).toDateString()}</p>
            <p>Recurs: {task.recurrence?.type || "None"}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onDelete(task._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit(task)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
