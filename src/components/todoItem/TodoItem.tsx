import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useTodo } from "../../context";
import { TodoType } from "../../types";
import "./TodoItem.scss";

type TodoItemProps = {
  todo: TodoType;
};

export default function TodoItem(props: TodoItemProps) {
  const { todo } = props;
  const { updateTodo, deleteTodo } = useTodo();
  const [todoName, setTodoName] = useState(todo.name);
  const [editing, setEditing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeTodoName = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const onPressEnterInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editing) {
      setEditing(!editing);
    }
  };

  useEffect(() => {
    if (
      editing === false &&
      todoName.trim() !== todo.name.trim() &&
      todoName.trim().length >= 3
    ) {
      updateTodo(todo.id, { ...todo, name: todoName.trim() });
    } else {
      if (todoName.trim().length < 3) {
        setTodoName(todo.name);
        setErrorMsg(
          "The todo's name length should be at least 3 characters long"
        );

        const errorMsgTimeout = setTimeout(() => {
          setErrorMsg("");
        }, 3000);
        return () => clearTimeout(errorMsgTimeout);
      }
    }
  }, [editing]);

  return (
    <>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <div className="todo-items">
        <div className="item-name">
          {!editing && todo.name}
          {editing && (
            <input
              type="text"
              className="edit-name"
              value={todoName}
              onChange={onChangeTodoName}
              onKeyDown={onPressEnterInput}
            />
          )}
        </div>
        <div className="modify-items">
          <button
            className="btn btn-edit-item"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Save" : "Edit"}
          </button>{" "}
          <button
            className="btn btn-delete-item"
            onClick={() => deleteTodo(todo.id)}
          >
            delete
          </button>
        </div>
      </div>
    </>
  );
}
