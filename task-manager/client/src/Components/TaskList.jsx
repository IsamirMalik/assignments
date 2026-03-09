function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  if (!tasks.length) {
    return <p className="empty-state">No tasks found.</p>;
  }

  // {console.log(tasks)}
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <div className="task-main">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>

          <div className="task-meta">
            <span className={`badge priority-${task.priority}`}>
              {task.priority}
            </span>
            <span className="badge">
              {task.completed ? "Completed" : "Incomplete"}
            </span>
            <button
              type="button"
              onClick={() => onToggleComplete(task)}
            >
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

