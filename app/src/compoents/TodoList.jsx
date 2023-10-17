import React, { useState, useRef } from "react";
import EditTodo from "./EditTodo";
export default function TodoList({ todos, onEdit, onDelete, onDrag }) {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragStart = (e, position) => {
    dragItem.current = position;
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  const dragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const copyListItems = [...todos];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      onDrag(copyListItems);
      console.log(copyListItems);
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };
  const drop = (e) => {
    e.preventDefault();
  };
  return (
    <div onDrop={drop} onDragOver={(e) => e.preventDefault()}>
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          draggable
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={dragEnd}
        >
          <EditTodo todo={todo} onChange={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
