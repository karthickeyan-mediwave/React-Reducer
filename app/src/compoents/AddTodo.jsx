import { useState } from "react";

export default function AddTodo({ onAddTodo }) {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});

  const validateValues = (text) => {
    console.log(text);
    let errors = {};
    if (text.length < 5) {
      errors.text = "todo is too short";
    }

    return errors;
  };

  function handleSubmit(e) {
    e.preventDefault();
    setText("");
    onAddTodo(text);
    setErrors(validateValues(text));
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
      {errors.text ? (
        <p className="error"> Todo should be at least 5 characters long</p>
      ) : null}
    </form>
  );
}
