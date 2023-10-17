import { useState } from "react";

export default function AddTodo({ onAddTodo }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setText("");
    onAddTodo(text);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          className="draggable"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
      </label>
      <button type="submit">ADD</button>
    </form>
  );
}
