/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AddIcon from "@mui/icons-material/Add";

// models
import { Board, Column } from "../models/board.model";
import { useDispatch, useSelector } from "react-redux";
import { setBoard, setBoards, setColumns } from "../actions/boardActions";
import { setName } from "../slices/boardSlice";
import Dialog from "./Dialog";
import EditBoardModal from "./modals/EditBoardModal";
import { RootState } from "../store";
import { closeModal, openCreateBoardModal } from "../actions/modalActions";
import { saveToLocalStorage } from "../utils/localStorage";
import { useState } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

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

  // get the columns from the selected board
  const handleSelectBoard = (board: Board, columns: Column[], name: string) => {
    // set board index to set style of the selected board
    setBoardIndex(board.id);

    // 1. dispatch the setColumns action with the selected board data
    dispatch(setColumns(columns)); // columns -> BoardsPage component
    dispatch(setName(name)); // name -> Header component
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

  return (
    <div className="plus-jakarta">
      {/* EDIT BOARD DIALOG */}
      <Dialog isOpen={currentModal === "create_board"}>
        <EditBoardModal
          onClose={handleCloseModal}
          onCreateBoard={handleBoardCreate}
        />
      </Dialog>
      <div
        role="navigation"
        className="w-[325px] bg-white h-screen top-0 border-solid absolute border-r-2 border-slate-300"
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
                  className={`py-4 text-medium_gray font-semibold flex flex-row gap-2 cursor-pointer px-2 ${
                    board.id === boardIndex
                      ? "bg-primary_btn_idle text-white"
                      : "bg-none"
                  } hover:bg-[#f0effa] hover:text-primary_btn_idle rounded-md transition duration-300`}
                >
                  <SpaceDashboardIcon />
                  {/* MAX LENGTH: 24 Characters */}
                  <p>{board.name}</p>
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
    </div>
  );
};

export default Sidebar;
