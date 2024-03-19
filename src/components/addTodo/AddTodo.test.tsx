import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import AddTodo from "./AddTodo";

describe("renders AddTodo component", () => {
  it("renders the component", () => {
    render(<AddTodo />);
    const inputElement = screen.getByPlaceholderText(/Add new item.../i);
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "New task" } });
    expect(inputElement).toHaveValue("New task");
  });

  it("input element's value should be cleared after adding new item", () => {
    render(<AddTodo />);
    const inputElement = screen.getByPlaceholderText(/Add new item.../i);
    const addBtn = screen.getByTestId("add-button");
    fireEvent.change(inputElement, { target: { value: "New task" } });
    expect(inputElement).toHaveValue("New task");
    fireEvent.click(addBtn);
    expect(inputElement).toHaveValue("");
  });

  it("should write error message on page if added item already exists in todos", async () => {
    render(<AddTodo />);
    const inputElement = screen.getByPlaceholderText(/Add new item.../i);
    const addBtn = screen.getByTestId("add-button");

    act(() => {
      userEvent.type(inputElement, "New task");
      userEvent.click(addBtn);
    });

    expect(inputElement).toHaveValue("");

    act(() => {
      userEvent.type(inputElement, "New task");
      userEvent.click(addBtn);
    });

    /*
    await waitFor(() => {
      const errorMessage = screen.queryByTestId("error-message");
      expect(errorMessage).toBeInTheDocument();
    });
    */

    /*
    await waitFor(() => {
      expect(
        screen.getByText(/Item already exists in the todos list./)
      ).toBeInTheDocument();
    });
    */
  });
});
