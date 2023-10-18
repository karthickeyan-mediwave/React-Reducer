import React, { useRef } from "react";
import EditTodo from "./EditTodo";
const Progess = ({ tasks, todos, onEdit, onDelete, todo, onDrag }) => {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const dragStart = (ev, position, index, id) => {
    dragItem.current = position;
    ev.dataTransfer.setData("id", id);
    console.log(id);

    console.log(index);
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  const dragEnd = (e, index, id) => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const DragTodoList = [...todos];
      const dragItemContent = DragTodoList[dragItem.current];
      console.log(dragItemContent.inState);
      console.log(dragItemContent.id);
      let dragItemContentinState = (dragItemContent.inState = "completed");
      // let dragItemContentinState1 = (dragItemContent.inState = "completed");
      // DragTodoList.splice(dragItem.current, 1);
      // DragTodoList.splice(dragOverItem.current, 0, dragItemContent);
      onDrag(DragTodoList);
      // onDrag(dragItemContentinState);
      console.log(
        DragTodoList,
        index,
        id,
        dragItemContentinState
        // dragItemContentinState1
      );
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };
  return (
    <div>
      <h2 className="pro-head">PROGRESS</h2>
      <div className="todo-list">
        {todos
          .filter((k) => k.inState == "progress")
          .map((todo, index) => (
            <div key={todo.id} className="edit-head">
              <div
                className="clear-btn"
                draggable
                onDragStart={(ev) => dragStart(ev, index, todo.id)}
                onDragEnter={(e) => dragEnter(e, index)}
                onDragEnd={(e) => dragEnd(e, index, id)}
              >
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
