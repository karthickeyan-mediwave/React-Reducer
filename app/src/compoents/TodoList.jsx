import React, { useState, useRef } from "react";
import EditTodo from "./EditTodo";
export default function TodoList({ todos, onEdit, onDelete, onDrag }) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragStart = (ev, position, index, id) => {
    dragItem.current = position;
    console.log(id);
  };
  const dragEnter = (e, position, index, id) => {
    console.log(position);
  };
  const dragEnd = (e, index, id) => {
    if (dragItem.current !== null) {
      const DragTodoList = [...todos];
      const dragItemContent = DragTodoList[dragItem.current];
      console.log(dragItemContent.inState);
      console.log(dragItemContent.id);
      let Dragid = dragItemContent.id;
      // dragItemContent.inState = "completed";
      onDrag(Dragid);
      console.log(index, id);
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };

  return (
    <div className="todo-list">
      {todos
        .filter((k) => k.inState == "todo")
        .map((todo, index, id) => (
          <div key={todo.id} className="edit-head">
            <div
              className="clear-btn"
              draggable
              onDragStart={(ev) => dragStart(ev, index, todo.id)}
              onDragEnter={(e) => dragEnter(e, index, todo.id)}
              onDragEnd={(e) => dragEnd(e, index, id)}
            >
              <button onClick={() => onDelete(todo.id)}>x</button>
            </div>
            <EditTodo todo={todo} onChange={onEdit} onDelete={onDelete} />
          </div>
        ))}
    </div>
  );
}
