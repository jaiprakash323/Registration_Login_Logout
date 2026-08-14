import { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialData = null, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        completed: initialData.completed || false,
      });
    } else {
      setForm({ title: '', description: '', completed: false });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: '', description: '', completed: false });
  };

  const isEditing = Boolean(initialData && initialData.id);

  return (
    <div className='task-form-card'>
      <h3 className='form-title'>
        {isEditing ? 'Edit Task' : 'Create Task'}
      </h3>
      <form className='form-group' onSubmit={handleSubmit}>
        <input
          className='input-field'
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className='input-field textarea-field'
          name="description"
          placeholder="Task Description (optional)..."
          value={form.description}
          onChange={handleChange}
        />
        <label className='checkbox-label'>
          <input
            className='checkbox-input'
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          Mark as Completed
        </label>
        <div className='form-actions'>
          <button className='btn-primary' type="submit">
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
          {isEditing && (
            <button className='btn-secondary btn-cancel' type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;