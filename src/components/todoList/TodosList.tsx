import { useTodo } from "../../context";
import { TodoType } from "../../types";
import TodoItem from "../todoItem/TodoItem";
import "./TodosList.scss";

export default function TodosList() {
  const { todos } = useTodo();

  return (
    <div className="todos-list-container">
      <ul>
        {todos.map((todo: TodoType, index) => (
          <li key={todo.id + index}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
