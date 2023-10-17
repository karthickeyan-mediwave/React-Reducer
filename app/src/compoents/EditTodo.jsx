import { useState } from "react";
// import "../compoents/syle.css";
export default function EditTodo({ todo, onChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleClick = () => {
    onChange({
      ...todo,
      text: editedText,
    });
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setEditedText(event.target.value);
  };
  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div onClick={handleClick} className="card">
      {isEditing ? (
        <>
          <textarea
            rows="2"
            cols="20"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {editedText}
          </textarea>
        </>
      ) : (
        <>
          {" "}
          <p> {todo.text} </p>{" "}
        </>
      )}
    </div>
  );
}
