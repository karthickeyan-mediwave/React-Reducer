import React from "react";
import EditTodo from "./EditTodo";
const Progess = ({ tasks, todos, onEdit, onDelete, todo }) => {
  return (
    <div>
      <h2 className="pro-head">PROGRESS</h2>
      <div className="todo-list">
        {todos
          .filter((k) => k.inState == "progress")
          .map((todo, index) => (
            <div key={todo.id} className="edit-head">
              <div className="clear-btn" draggable>
                <button onClick={() => onDelete(todo.id)}>x</button>
              </div>
              <EditTodo todo={todo} onChange={onEdit} onDelete={onDelete} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Progess;
