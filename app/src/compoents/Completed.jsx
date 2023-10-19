import { useRef } from "react";
import EditTodo from "./EditTodo";

const Completed = ({ tasks, todos, onEdit, onDelete, onDrag }) => {
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
    if (dragItem.current !== null) {
      const DragTodoList1 = [...todos];
      const dragItemContent = DragTodoList1[dragItem.current];
      console.log(dragItemContent.inState);
      console.log(dragItemContent.id);
      // let dragItemContentinState1 = (dragItemContent.inState = "progress");
      let Dragid = dragItemContent.id;
      onDrag(Dragid);
      // onDrag(dragItemContentinState);
      console.log(index, id);
      dragItem.current = null;
      dragOverItem.current = null;
    }
  };
  return (
    <div>
      <div>
        <h2 className="completed">COMPLETED</h2>
        <div className="todo-list">
          {todos
            .filter((k) => k.inState == "completed")
            .map((todo, index, id) => (
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
    </div>
  );
};

export default Completed;
