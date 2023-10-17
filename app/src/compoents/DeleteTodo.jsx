import React from "react";

const DeleteTodo = (onDelete) => {
  return (
    <div>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default DeleteTodo;
