import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import { Todo } from "./Todo";

const API_URL = "http://localhost:8000/tasks";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all"); 

  useEffect(() => {
    fetchTodos();
  }, [statusFilter]); 

  const fetchTodos = async () => {
    const url = statusFilter === "all" ? API_URL : `${API_URL}?status=${statusFilter}`;
    const response = await fetch(url);
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (todo) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: todo, description: todo.description, status: "todo" }),
    });
    const newTask = await response.json();
    setTodos([...todos, newTask]);
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const editTodo = async (id, newTitle, newDescription, newStatus) => {
    const updatedTodo = {
      id,
      name: newTitle,
      description: newDescription,
      status: newStatus,
    };

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    if (response.ok) {
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };


  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="TodoWrapper">
      <h1>Todo List</h1>
      <select value={statusFilter} onChange={handleStatusChange} className="status-filter">
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <TodoForm addTodo={addTodo} />

      {todos.map((todo) => (
        <Todo
          task={todo}
          key={todo.id}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </div>
  );
};

export default TodoWrapper;
