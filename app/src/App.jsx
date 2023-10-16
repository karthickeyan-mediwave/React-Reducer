import { useReducer } from "react";
import AddTodo from "./compoents/AddTodo";
import TodoList from "./compoents/TodoList";

export default function Todo() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function todosReducer(todos, action) {
    switch (action.type) {
      case "added": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.text,
            done: false,
          },
        ];
      }
      case "changed": {
        return todos.map((t) => {
          if (t.id === action.task.id) {
            return action.task;
          } else {
            return t;
          }
        });
      }
      case "deleted": {
        return todos.filter((t) => t.id !== action.id);
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  function handleAddTask(text) {
    dispatch({
      type: "added",
      text: text,
    });
  }

  function handleEdit(task) {
    dispatch({
      type: "changed",
      task: task,
    });
  }

  function handleDelete(taskId) {
    dispatch({
      type: "deleted",
      id: taskId,
    });
  }

  return (
    <>
      <h1>todo</h1>
      <AddTodo onAddTask={handleAddTask} />
      <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}
