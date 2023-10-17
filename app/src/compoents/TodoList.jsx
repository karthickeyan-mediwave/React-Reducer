import React, { useState, useRef } from "react";
import EditTodo from "./EditTodo";

export default function TodoList({ todos, onEdit, onDelete }) {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };
  const drop = (e) => {
    const copyListItems = [...todos];
    console.log([...todos]);
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    // setList(copyListItems);
    console.log(copyListItems);
  };

  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          draggable
          onDragStart={(e) => dragStart(e, todo.id)}
          onDragEnter={(e) => dragEnter(e, todo.id)}
          onDragEnd={drop}
        >
          <EditTodo todo={todo} onChange={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
