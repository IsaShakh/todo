import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task, onCancel }) => {
  const [newTitle, setNewTitle] = useState(task.name || "");
  const [newDescription, setNewDescription] = useState(task.description || "");
  const [newStatus, setNewStatus] = useState(task.status || "todo"); 

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(task.id, newTitle, newDescription, newStatus);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="todo-input"
        placeholder="Update task"
      />
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        className="todo-input"
        placeholder="Description"
      />
      <select
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
        className="todo-input"
      >
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit" className="todo-btn">
        Update Task
      </button>
      <button type="button" onClick={onCancel} className="todo-btn cancel-btn">
        Cancel
      </button>
    </form>
  );
};
