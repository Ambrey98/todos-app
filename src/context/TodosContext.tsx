import { createContext, useContext } from "react";
import { TodoType } from "../types";

export const TodosContext = createContext({
  todos: [
    {
      id: Date.now() + 1,
      name: "eat breakfast",
      completed: false,
    },
    {
      id: Date.now() + 2,
      name: "go running",
      completed: false,
    },
    {
      id: Date.now() + 3,
      name: "clean house",
      completed: false,
    },
  ],
  addTodo: (todo: TodoType) => {},
  updateTodo: (id: number, todo: TodoType) => {},
  deleteTodo: (id: number) => {},
  toggleComplete: (id: number) => {},
});

export const useTodo = () => {
  return useContext(TodosContext);
};

export const TodoProvider = TodosContext.Provider;
