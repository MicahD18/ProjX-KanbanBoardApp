/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import modalReducer from "../../reducers/modalReducer";
import boardReducer from "../../reducers/boardReducers";
import sidebarReducer from "../../reducers/sidebarReducers";
import authSlice from "../../slices/authSlice";
import { beforeEach, describe, expect } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import Sidebar from "../../components/Sidebar";

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

describe("Sidebar Component", () => {
  beforeEach(() => {
    store.dispatch = vi.fn();
  });

  it("should render without crashing", () => {
    const { getByRole } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    const sidebar = getByRole("sidebar");
    expect(sidebar);
  });

  it("should render with correct initial state", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    expect(getByText("ALL BOARDS (1)"));
    expect(getByText("Test Board"));
  });

  it("should toggle sidebar visibility", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    const toggleButton = getByTestId("toggle-sidebar-button");
    fireEvent.click(toggleButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "OPEN_SIDEBAR",
    });

    fireEvent.click(toggleButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "OPEN_SIDEBAR",
    });
  });

  it("should display all boards", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    expect(getByText("Test Board"));
  });

  it("should open create board modal", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    const createBoardButton = getByText("Create New Board");
    fireEvent.click(createBoardButton);

    expect(store.dispatch).toHaveBeenCalledWith({ type: "CREATE_BOARD_MODAL" });
  });

  it("should select a board", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    const boardButton = getByText("Test Board");
    fireEvent.click(boardButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: "SET_COLUMNS",
      payload: [],
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "SET_BOARD_NAME",
      payload: "Test Board",
    });
    expect(store.dispatch).toHaveBeenCalledWith({
      type: "SET_BOARD",
      payload: {
        id: "board-bfeaa29b-5757-435b-9f80-71cd5e3c60c9",
        name: "Test Board",
        columns: [],
      },
    });
  });
});
