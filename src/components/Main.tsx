import AddTodo from "./addTodo/AddTodo";
import "./Main.scss";
import TodosList from "./todoList/TodosList";

export default function Main() {
  return (
    <div className="main-container">
      <h1>Todos Page</h1>
      <AddTodo />
      <TodosList />
    </div>
  );
}
