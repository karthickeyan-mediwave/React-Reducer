import { useReducer } from "react";
import AddTodo from "./compoents/AddTodo";
import TodoList from "./compoents/TodoList";
import "./syle.css";

export default function Todo() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  function todosReducer(todos, action) {
    switch (action.type) {
      case "ADD": {
        const newTodo = {
          id: new Date().getTime(),
          text: action.text,
          done: false,
          draggable: true,
        };
        const updatedTodos = [...todos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      case "EDIT": {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return action.todo;
          } else {
            return todo;
          }
        });
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      case "DELETE": {
        const updatedTodos = todos.filter((todo) => todo.id !== action.id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      case "DRAG": {
        const updatedTodos = action.value;
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  function handleAddTodo(text) {
    dispatch({
      type: "ADD",
      text: text,
    });
  }

  function handleEdit(todo) {
    dispatch({
      type: "EDIT",
      todo: todo,
    });
  }

  function handleDelete(todoId) {
    dispatch({
      type: "DELETE",
      id: todoId,
    });
  }
  function onDrag(DragTodoList) {
    console.log(DragTodoList);
    dispatch({
      type: "DRAG",
      value: DragTodoList,
    });
  }

  return (
    <>
      {/* <AddEditableTodo initialText="Sample Text" /> */}

      <div class="w3-row">
        <h1>Task</h1>
        <div class="w3-third w3-container color">
          <h2>
            <div className="todo">
              <h2>Todo</h2>
              <AddTodo onAddTodo={handleAddTodo} />
              <TodoList
                todos={todos}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onDrag={onDrag}
              />
            </div>
          </h2>
        </div>
        <div class="w3-third w3-container progress">
          <h2>progress</h2>
        </div>
        <div class="w3-third w3-container completed">
          <h2>completed</h2>
        </div>
      </div>
    </>
  );
}
