import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditTodoForm } from "./EditTodoForm";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleSave = (id, newTitle, newDescription, newStatus) => {
    editTodo(id, newTitle, newDescription, newStatus);
    setIsEditing(false); 
  };

  const handleCancel = () => {
    setIsEditing(false); 
  };

  return (
    <div className="Todo">
      {isEditing ? (
        <EditTodoForm
          task={task}
          editTodo={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <p
            className={`${
              task.status === "done" ? "completed" : "incompleted"
            }`}
            
          >
            {task.name}
          </p>
          <div>
            <FontAwesomeIcon
              className="edit-icon"
              icon={faPenToSquare}
              onClick={handleEditClick} 
            />
            <FontAwesomeIcon
              className="delete-icon"
              icon={faTrash}
              onClick={() => deleteTodo(task.id)}
            />
          </div>
        </>
      )}
    </div>
  );
};
