export default function AddTodo({ onAddTodo }) {
  function handleSubmit(e) {
    e.preventDefault();
    onAddTodo("");
    // setErrors(validateValues(text));
  }

  return (
    <form onSubmit={handleSubmit} class="w3-container">
      <div className="todo-head">
        <div className="pro-head">
          <h2>TASK</h2>
        </div>
        <div className="submit-btn">
          <button type="submit">+</button>
        </div>
      </div>
    </form>
  );
}
