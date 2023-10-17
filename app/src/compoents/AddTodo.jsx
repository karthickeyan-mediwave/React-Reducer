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
    <form onSubmit={handleSubmit} class="w3-container">
      <label>
        <input
          type="text"
          class="w3-input"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        />
      </label>
      <div className="submit-btn">
        <button type="submit">ADD</button>
      </div>

      {errors.text ? (
        <p className="error"> Todo should be at least 5 characters long</p>
      ) : null}
    </form>
  );
}
export const AddEditableTodo = ({ initialText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const handleClick = () => {
    onChange({
      ...todo,
      text: editedText,
    });
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleBlur = () => {
    setIsEditing(false);
  };
  return (
    <div>
      <div onClick={handleClick}>
        {isEditing ? (
          <input
            class="w3-input"
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ) : (
          <span>{text}</span>
        )}
      </div>
    </div>
  );
};
