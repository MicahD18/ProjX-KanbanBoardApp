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
import { openEditBoardModal } from "../../actions/modalActions";
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

  it("should dispatch openEditBoardModal action", () => {
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

  // Add more tests as needed
});

// OLD:
// export const testStore = (state: Partial<RootState>) => {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(thunk, logger),
//     preloadedState: state,
//   });
// };

// export const renderWithStore = (
//   ui: React.ReactElement,
//   initialState: Partial<RootState>
// ) => {
//   function Wrapper({ children }: { children: React.ReactNode }) {
//     return <Provider store={testStore(initialState)}>{children}</Provider>;
//   }
//   return render(ui, { wrapper: Wrapper });
// };

// describe("Header Component", () => {
//   it("should render the header with the initial state", () => {
//     const initialState = {
//       modalReducer: { currentModal: null },
//       boardReducer: {
//         selectedBoard: { id: 1, name: "Test Board", columns: [] }, // Added a selectedBoard
//         boards: [],
//         columns: null,
//         selectedTask: null,
//       },
//       sidebarReducer: { currentState: true },
//       auth: { isAuthenticated: true },
//     };

//     const component = <Header />;

//     const { getByText } = renderWithStore(component, initialState);

//     expect(getByText("ProjX"));
//     expect(getByText("Test Board"));
//   });
// });
