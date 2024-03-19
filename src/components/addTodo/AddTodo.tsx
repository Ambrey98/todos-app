import { useEffect, useState } from "react";
import { useTodo } from "../../context";
import { TodoType } from "../../types";
import "./AddTodo.scss";

export default function AddTodo() {
  const { todos, addTodo } = useTodo();
  const [todoName, setTodoName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onAddNewItem = () => {
    const isNewItemAlreadyInTodos =
      todos.filter((todo: TodoType) => todo.name === todoName).length >= 1;

    if (todoName && todoName.trim().length > 0 && !isNewItemAlreadyInTodos) {
      const newTodo = {
        id: Date.now(),
        name: todoName,
        completed: false,
      };

      addTodo(newTodo);
      setTodoName("");
    } else {
      setErrorMsg("Item already exists in the todos list.");
    }
  };

  useEffect(() => {
    const errorMsgTimeout = setTimeout(() => {
      setErrorMsg("");
    }, 3000);

    return () => clearTimeout(errorMsgTimeout);
  }, [errorMsg]);

  return (
    <div className="todo-container">
      <input
        type="text"
        name="item-input"
        placeholder="Add new item..."
        onChange={(e) => {
          setTodoName(e.target.value);
        }}
        value={todoName}
      />
      <button
        className="btn btn--add"
        onClick={onAddNewItem}
        data-testid="add-button"
      >
        +
      </button>
      {errorMsg && (
        <p className="error-message" data-testid="error-message">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
