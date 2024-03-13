import { useEffect, useState } from "react";
import { useTodo } from "../context";
import { TodoType } from "../types";

export default function useLocalStorage(key: string, initialValue: TodoType[]) {
  const { todos } = useTodo();
  const [value, setValue] = useState(() => {
    const localStValue = localStorage.getItem(key);

    if (localStValue) {
      return JSON.parse(localStValue);
    } else {
      return todos.length > 0 ? todos : initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
