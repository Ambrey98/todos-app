import {
  fireEvent,
  queryByTestId,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { TodoProvider } from "../../context";
import { TodoType } from "../../types";
import TodoItem from "./TodoItem";

const mockTodo = {
  id: 1,
  name: "todo",
  completed: false,
};

describe("TodoItem", () => {
  it("should render TodoItem", () => {
    render(<TodoItem todo={mockTodo} />);
  });

  it("in editing mode the page should display the item's input field", () => {
    render(<TodoItem todo={mockTodo} />);
    const editBtn = screen.getByTestId("edit-button");

    fireEvent.click(editBtn);

    const modifyTodoInput = screen.getByTestId("modify-todo-input");

    expect(modifyTodoInput).toBeInTheDocument();
  });

  it("clicking on edit button, the todo item's name should be modifiable", () => {
    render(<TodoItem todo={mockTodo} />);
    const editBtn = screen.getByTestId("edit-button");

    act(() => {
      userEvent.click(editBtn);
    });

    const modifyTodoInput = screen.getByTestId("modify-todo-input");

    expect(modifyTodoInput).toHaveValue("todo");

    fireEvent.change(modifyTodoInput, { target: { value: "todo2" } });
    fireEvent.click(editBtn);
    expect(modifyTodoInput).not.toBeInTheDocument();
  });

  it("should throw error if modified name's length is less than 3", async () => {
    render(<TodoItem todo={mockTodo} />);
    const editBtn = screen.getByTestId("edit-button");

    act(() => {
      userEvent.click(editBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("todo-name")).not.toBeInTheDocument();
    });

    const modifyTodoInput = screen.getByTestId("modify-todo-input");

    expect(modifyTodoInput).toHaveValue("todo");

    act(() => {
      userEvent.clear(modifyTodoInput);
      userEvent.type(modifyTodoInput, "to");
      userEvent.click(editBtn);
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          /The todo's name length should be at least 3 characters long/
        )
      ).toBeInTheDocument();

      expect(screen.getByTestId("todo-name")).toBeInTheDocument();
    });

    await waitFor(
      () => {
        expect(
          screen.queryByTestId(
            /The todo's name length should be at least 3 characters long/
          )
        ).not.toBeInTheDocument();
      },
      { timeout: 3050 }
    );
  });

  it("clicking on the delete button, the todo item should be deleted", async () => {
    const deleteTodo = jest.fn();
    const updateTodo = jest.fn();
    const addTodo = jest.fn();
    const toggleComplete = jest.fn();
    const todos: TodoType[] = [mockTodo];

    render(
      <TodoProvider
        value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
      >
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );
    const todoItem = screen.getByTestId("todo-item");
    const deleteButton = screen.getByTestId("delete-button");

    expect(todoItem).toBeInTheDocument();

    act(() => {
      userEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(deleteTodo).toHaveBeenCalledWith(mockTodo.id);
    });
  });
});
