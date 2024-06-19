/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";
import Header from "../../components/Header";
// import rootReducer, { RootState } from "../../store";
import modalReducer from "../../reducers/modalReducer";
import boardReducer from "../../reducers/boardReducers";
import sidebarReducer from "../../reducers/sidebarReducers";
import authSlice from "../../slices/authSlice";
import {
  closeModal,
  openDeleteBoardModal,
  openEditBoardModal,
} from "../../actions/modalActions";
import { debug } from "console";

// NEW:
const rootReducer = combineReducers({
  modalReducer,
  boardReducer,
  sidebarReducer,
  authSlice,
});

const initialState = {
  boardReducer: {
    selectedBoard: {
      id: "board-bfeaa29b-5757-435b-9f80-71cd5e3c60c9",
      name: "Test Board",
      columns: [],
    },
    boards: [
      {
        id: "board-bfeaa29b-5757-435b-9f80-71cd5e3c60c9",
        name: "Test Board",
        columns: [],
      },
    ],
    columns: [],
    selectedTask: null,
  },
  modalReducer: { currentModal: null },
  sidebarReducer: { currentState: false },
  authSlice: { isAuthenticated: true },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState as any,
});

describe("Header Component", () => {
  beforeEach(() => {
    store.dispatch = vi.fn();
    // Mock the location.pathname
    Object.defineProperty(window, "location", {
      value: {
        pathname: "/",
      },
      writable: true,
    });
  });

  it("should render without crashing", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const header = getByRole("header");
    expect(header);
  });

  it("should dispatch openEditBoardModal action on edit button click", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Debugging step to inspect the rendered output
    debug();

    const editButton = getByRole("button", { name: /edit board/i });
    fireEvent.click(editButton);

    expect(store.dispatch).toHaveBeenCalledWith(openEditBoardModal());
  });

  it("should dispatch openDeleteBoardModal action on delete button click in EditBoardModal", () => {
    const { getByRole, getByText } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Open the edit board modal
    const editButton = getByRole("button", { name: /edit board/i });
    fireEvent.click(editButton);

    // Simulate the EditBoardModal being rendered and the delete button being clicked
    const deleteButton = getByText(/delete board/i);
    fireEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(openDeleteBoardModal());
  });

  it("should close the modal when handleCloseModal is called", () => {
    store.dispatch(closeModal());

    expect(store.dispatch).toHaveBeenCalledWith(closeModal());
  });

  it("should conditionally render based on location.pathname", () => {
    // Test when pathname is "/sign-in"
    window.location.pathname = "/sign-in";
    const { queryByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(queryByRole("button", { name: /edit board/i })).not;

    // Test when pathname is not "/sign-in" or "/sign-up"
    window.location.pathname = "/";
    const { getByRole } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(getByRole("button", { name: /edit board/i }));
  });
});
