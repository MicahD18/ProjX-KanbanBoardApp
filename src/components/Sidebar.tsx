/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// models
import { Board, Column } from "../models/board.model";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoard,
  setBoardName,
  setBoards,
  setColumns,
} from "../actions/boardActions";
// import { setName } from "../slices/boardSlice";
import Dialog from "./Dialog";
import EditBoardModal from "./modals/EditBoardModal";
import { RootState } from "../store";
import { closeModal, openCreateBoardModal } from "../actions/modalActions";
import { saveToLocalStorage } from "../utils/localStorage";
import { useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { closeSidebar, openSidebar } from "../actions/sidebarActions";

const Sidebar = () => {
  const dispatch = useDispatch();
  // State that handles the modals
  const { currentModal } = useSelector(
    (state: RootState) => state.modalReducer
  );

  const boards = useSelector(
    (state: { boardReducer: { boards: Board[] } }) => state.boardReducer.boards
  );

  const [boardIndex, setBoardIndex] = useState<UniqueIdentifier | null>(null);

  const sidebar = useSelector((state: RootState) => state.sidebarReducer);

  // get the columns from the selected board
  const handleSelectBoard = (board: Board, columns: Column[], name: string) => {
    // set board index to set style of the selected board
    setBoardIndex(board.id);

    // 1. dispatch the setColumns action with the selected board data
    dispatch(setColumns(columns)); // columns -> BoardsPage component
    dispatch(setBoardName(name)); // name -> Header component
    dispatch(setBoard(board));
  };

  const handleOpenCreateBoardModal = () => {
    dispatch(openCreateBoardModal());
  };

  const handleBoardCreate = (newBoard: Board) => {
    const updatedBoards = [...boards, newBoard];

    dispatch(setBoards(updatedBoards));
    // save the updated boards array to local storage
    saveToLocalStorage("boards", updatedBoards);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const toggleSidebar = () => {
    sidebar.currentState === false
      ? dispatch(openSidebar())
      : dispatch(closeSidebar());
  };

  return (
    <nav className="plus-jakarta" role="sidebar">
      {/* EDIT BOARD DIALOG */}
      <Dialog isOpen={currentModal === "create_board"}>
        <EditBoardModal
          onClose={handleCloseModal}
          onCreateBoard={handleBoardCreate}
        />
      </Dialog>
      <div
        role="navigation"
        className={`w-[325px] bg-white h-screen top-0 border-solid absolute ${
          sidebar.currentState ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex flex-col px-8">
          <div className="flex flex-row py-7 text-[#635FC7] text-xl items-center">
            <DashboardIcon />
            <p className="ml-2 plus-jakarta font-extrabold">ProjX</p>
          </div>
          <div className="mt-4">
            <p className="plus-jakarta font-semibold text-xs tracking-widest text-light_gray">
              ALL BOARDS ({boards.length})
            </p>
            <div className="flex flex-col mt-6">
              {boards.map((board: Board) => (
                <button
                  key={board.id}
                  onClick={() =>
                    handleSelectBoard(board, board.columns, board.name)
                  }
                  className={`py-4 text-medium_gray font-semibold flex flex-row gap-2 cursor-pointer px-2 items-center ${
                    board.id === boardIndex
                      ? "bg-primary_btn_idle text-white"
                      : "bg-none"
                  } hover:bg-[#f0effa] hover:text-primary_btn_idle rounded-md transition duration-300`}
                >
                  <SpaceDashboardIcon />
                  {/* MAX LENGTH: 24 Characters */}
                  <p className="text-sm">{board.name}</p>
                </button>
              ))}
            </div>
            <button
              onClick={handleOpenCreateBoardModal}
              className="btn btn-sm lg:btn-md bg-transparent text-primary_btn_idle border-none plus-jakarta mt-6 h-12 hover:bg-transparent"
            >
              <AddIcon />
              Create New Board
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10">
        {sidebar.currentState === true ? (
          <button
            onClick={toggleSidebar}
            className="text-gray-500 h-14 transition duration-300 rounded-r-lg px-4 flex flex-row items-center hover:bg-[#f0effa] hover:text-primary_btn_idle"
            data-testid="toggle-sidebar-button"
          >
            <VisibilityOffIcon className="ml-4" />
            <p className="ml-4 font-semibold text-md">Hide Sidebar</p>
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="bg-[#635FC7] text-white w-14 h-14 hover:bg-primary_btn_hover transition duration-300 rounded-r-lg"
            data-testid="toggle-sidebar-button"
          >
            <VisibilityIcon role="VisibilityIcon" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
