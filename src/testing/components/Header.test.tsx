import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";
import Header from "../../components/Header";
import rootReducer from "../../store";

// Mock the necessary icons and components
vi.mock("@mui/icons-material/Dashboard", () => ({
  default: () => <div>DashboardIcon</div>,
}));
vi.mock("@mui/icons-material/Edit", () => ({
  default: () => <div>EditIcon</div>,
}));
vi.mock("../../components/modals/EditBoardModal.tsx", () => ({
  default: ({ isOpen, children }) => (isOpen ? <div>{children}</div> : null),
}));
vi.mock("../../components/modals/DeleteBoardModal.tsx", () => ({
  default: ({ onClose, board, onSaveBoard, onBoardDelete }) => (
    <div>
      EditBoardModal
      <button onClick={onClose}>Close</button>
      <button onClick={() => onSaveBoard(board)}>Save</button>
      <button onClick={onBoardDelete}>Delete</button>
    </div>
  ),
}));
vi.mock("../../components/modals/DeleteModal.tsx", () => ({
  default: ({ board, onBoardDelete, onClose }) => (
    <div>
      DeleteModal
      <button onClick={() => onBoardDelete(board)}>Delete</button>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const renderWithProviders = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
  } = {}
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("Header Component", () => {
  it("should render the header with the selected board name", () => {
    const initialState = {
      modalReducer: { currentModal: null },
      boardReducer: {
        boards: [],
        board: { id: "1", name: "Test Board", columns: [] },
      },
      sidebarReducer: { currentState: false },
    };

    renderWithProviders(<Header />, { initialState });

    expect(screen.getByText("ProjX"));
    expect(screen.getByText("Test Board"));
  });
});
