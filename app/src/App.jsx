import { useReducer, useState, useEffect } from "react";
import AddTodo from "./compoents/AddTodo";
import TodoList from "./compoents/TodoList";
import Progess from "./compoents/Progess";
import "./syle.css";
import Completed from "./compoents/Completed";
const tasks = [
  {
    id: 123,
    text: "Add space validation for inputs",
    dateTime: new Date(),
    inState: "todo",
  },
  {
    id: 456,
    text: "review code in GH",
    dateTime: new Date(),
    inState: "in_progress",
  },
  {
    id: 789,
    text: "Clean up code",
    dateTime: new Date(),
    inState: "done",
  },
];

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
          dateTime: new Date(),
          inState: "todo",
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
  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(updatedTodos));
  // }, []);
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

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem("todos"));
  //   if (items) {
  //     setItems(items);
  //   }
  // }, []);
  const drop = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container">
        <h1>Trello</h1>
        <div className="row ">
          <div className="col-sm taskDiv">
            <AddTodo onAddTodo={handleAddTodo} />
            <TodoList
              todos={todos}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDrag={onDrag}
            />
          </div>
          <div
            className="col-sm taskDiv"
            onDrop={drop}
            onDragOver={(e) => e.preventDefault()}
            onDrag={onDrag}
          >
            <Progess
              tasks={tasks}
              todos={todos}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
          <div
            className="col-sm taskDiv"
            onDrop={drop}
            onDragOver={(e) => e.preventDefault()}
          >
            <Completed
              tasks={tasks}
              todos={todos}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
