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
  const dragEnd = (e, index) => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const DragTodoList = [...todos];
      const dragItemContent = DragTodoList[dragItem.current];
      DragTodoList.splice(dragItem.current, 1);
      DragTodoList.splice(dragOverItem.current, 0, dragItemContent);
      onDrag(DragTodoList);
      console.log(DragTodoList, index);
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };
  const drop = (e) => {
    e.preventDefault();
  };
  return (
    <div
      onDrop={drop}
      onDragOver={(e) => e.preventDefault()}
      className="todo-list"
    >
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          draggable
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          onDragEnd={(e) => dragEnd(e, index)}
        >
          <EditTodo todo={todo} onChange={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
