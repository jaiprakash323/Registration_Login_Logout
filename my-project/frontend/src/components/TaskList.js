function TaskList({ tasks = [], onEdit, onDelete }) {
  return (
    <div className="task-list-section">
      <div className="section-header">
        <h2 className="section-title">Your Tasks</h2>
        <span className="task-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>No tasks found</h3>
          <p>Get started by creating your first task using the form!</p>
        </div>
      ) : (
        <ul className="task-grid">
          {tasks.map((task) => (
            <li key={task.id} className="task-card">
              <div>
                <div className="task-card-header">
                  <h3 className="task-card-title">{task.title}</h3>
                  <span className={`status-badge ${task.completed ? 'completed' : 'pending'}`}>
                    {task.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                {task.description && (
                  <p className="task-card-desc">{task.description}</p>
                )}
              </div>
              <div className="task-card-actions">
                <button className="btn-task-action btn-edit" onClick={() => onEdit(task)}>
                  Edit
                </button>
                <button className="btn-task-action btn-delete" onClick={() => onDelete(task.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;