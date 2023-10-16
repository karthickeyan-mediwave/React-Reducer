import { useState } from "react";

export default function TodoList({ todos, onEdit, onDelete }) {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoEntries todos={todos} onChange={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

function TodoEntries({ todos, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={todos.text}
          onChange={(e) => {
            onChange({
              ...todos,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Update</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {todos.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={todos.done}
        onChange={(e) => {
          onChange({
            ...todos,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(todos.id)}>Delete</button>
    </label>
  );
}
