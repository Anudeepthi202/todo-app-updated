export default function TaskItem({ task }) {
    return (
      <div className="p-2 border rounded flex justify-between items-center">
        <div>
          <p className="font-semibold">{task.title}</p>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
        <div>
          {/* TODO: Add edit/delete buttons */}
        </div>
      </div>
    );
  }