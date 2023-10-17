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
      <h1>Todo</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDrag={onDrag}
      />
    </>
  );
}
