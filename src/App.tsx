import React from "react";
import Main from "./components/Main";
import { TodoProvider } from "./context";
import useLocalStorage from "./hooks/useLocalStorage";
import { TodoType } from "./types";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);

  const addTodo = (todo: TodoType) => {
    const todosCopied: TodoType[] = [...todos];

    const newTodo: TodoType = {
      id: Date.now(),
      name: todo.name,
      completed: false,
    };

    todosCopied.push(newTodo);
    setTodos(todosCopied);
  };

  const updateTodo = (id: number, todo: TodoType) => {
    const todosCopied: TodoType[] = [...todos];
    const indexToUpdateAt = todosCopied.findIndex(
      (todo: TodoType) => todo.id === id
    );

    if (indexToUpdateAt >= 0) {
      todosCopied[indexToUpdateAt] = todo;
      setTodos(todosCopied);
    } else {
      return;
    }
  };

  const deleteTodo = (id: number) => {
    const todosFiltered = todos.filter((todo: TodoType) => todo.id !== id);
    setTodos(todosFiltered);
  };

  const toggleComplete = (id: number) => {
    const todosCopied: TodoType[] = [...todos];
    const indexToUpdateAt = todosCopied.findIndex(
      (todo: TodoType) => todo.id === id
    );

    if (indexToUpdateAt) {
      todosCopied[indexToUpdateAt].completed = true;
      setTodos(todosCopied);
    } else {
      return;
    }
  };

  return (
    <TodoProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
    >
      <Main />
    </TodoProvider>
  );
}

export default App;
