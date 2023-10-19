import { useReducer, useState, useEffect } from "react";
import AddTodo from "./compoents/AddTodo";
import TodoList from "./compoents/TodoList";
import Progess from "./compoents/Progess";
import "./syle.css";
import Completed from "./compoents/Completed";

export default function Todo() {
  const initialTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);
  const [startid, setstartid] = useState();
  function todosReducer(todos, action) {
    switch (action.type) {
      case "ADD": {
        const newTodo = {
          id: new Date().getTime(),
          text: action.text,
          done: false,
          draggable: true,
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
      // case "DRAG-PROGRESS": {
      //   const updatedTodos = action.value;
      //   localStorage.setItem("todos", JSON.stringify(updatedTodos));
      //   return updatedTodos;
      // }
      case "PROGRESS": {
        let updatedTodos = todos.filter((task) => {
          if (task.id == action.value.id) {
            task.inState = action.value.state;
          }

          return task;
        });
        console.log(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        return updatedTodos;
      }

      // case "DRAG-COMPLETE": {
      //   const updatedTodos = action.values;
      //   localStorage.setItem("todos", JSON.stringify(updatedTodos));
      //   console.log(updatedTodos);
      //   return updatedTodos;
      // }
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
  // function onDrag(DragTodoList) {
  //   console.log(DragTodoList);
  //   dispatch({
  //     type: "DRAG-PROGRESS",
  //     value: DragTodoList,
  //   });
  // }

  function onDrag(Dragid) {
    console.log(Dragid);
    setstartid(Dragid);
  }

  // function onDrag1(DragTodoList1) {
  //   console.log(DragTodoList1);
  //   dispatch({
  //     type: "DRAG-COMPLETE",
  //     values: DragTodoList1,
  //   });
  // }

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem("todos"));
  //   if (items) {
  //     setItems(items);
  //   }
  // }, []);
  const drop = (e, state) => {
    e.preventDefault();
    handledrop(state, startid);
  };
  function handledrop(state, id) {
    dispatch({
      type: "PROGRESS",
      value: { state, id },
    });
  }

  return (
    <>
      <div className="container">
        <h1>Trello</h1>
        <div className="row ">
          <div
            className="col-sm taskDiv"
            onDrop={(e) => drop(e, "todo")}
            onDragOver={(e) => e.preventDefault()}
          >
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
            onDrop={(e) => drop(e, "progress")}
            onDragOver={(e) => e.preventDefault()}
          >
            <Progess
              todos={todos}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onDrag={onDrag}
            />
          </div>
          <div
            className="col-sm taskDiv"
            onDrop={(e) => drop(e, "completed")}
            onDragOver={(e) => e.preventDefault()}
          >
            <Completed
              todos={todos}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onDrag={onDrag}
            />
          </div>
        </div>
      </div>
    </>
  );
}
