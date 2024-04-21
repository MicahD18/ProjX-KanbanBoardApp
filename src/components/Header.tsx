import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../store";
import { Board } from "../models/board.model";
import { Menu, MenuItem } from "@mui/material";
import { closeModal, openEditBoardModal } from "../actions/modalActions";
import Dialog from "./Dialog";
import EditBoardModal from "./modals/EditBoardModal";
import { setBoard, setBoards, setColumns } from "../actions/boardActions";

const Header = () => {
  const dispatch = useDispatch();
  // State that handles the modals
  const { currentModal } = useSelector(
    (state: RootState) => state.modalReducer
  );

  // const selectedName = useSelector((state: RootState) => state.board.name);
  // const selectedColumns = useSelector(
  //   (state: RootState) => state.board.columns
  // );
  const boards = useSelector(
    (state: { boardReducer: { boards: Board[] } }) => state.boardReducer.boards
  );
  const selectedBoard = useSelector(
    (state: { boardReducer: { board: Board | null } }) =>
      state.boardReducer.board
  );
  // const memoizedSelectedName = useMemo(() => selectedName, [selectedName]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // for popup menu
  const open = Boolean(anchorEl); // for popup menu

  // useEffect(() => {
  //   console.log(selectedBoard);
  //   console.log(boards);
  // }, [selectedBoard, boards]);

  // Menu for editing/deleting board
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditBoardModal = () => {
    dispatch(openEditBoardModal());
  };

  const handleOpenDeleteBoardModal = () => {
    console.log("delete board...");
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleBoardUpdate = (updatedBoard: Board) => {
    const newBoards = boards
      ? boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        )
      : [];
    dispatch(setBoards(newBoards));
    dispatch(setBoard(updatedBoard));
    dispatch(setColumns(updatedBoard.columns));
  };

  return (
    <>
      {/* EDIT BOARD DIALOG */}
      <Dialog isOpen={currentModal === "edit_board"}>
        {selectedBoard && (
          <EditBoardModal
            onClose={handleCloseModal}
            board={selectedBoard}
            onSaveBoard={handleBoardUpdate}
          />
        )}
      </Dialog>
      <div
        role="header"
        className="w-full bg-white h-20 flex flex-row justify-between items-center px-2 pl-4 md:pl-20"
      >
        <div className="flex flex-row w-[450px] justify-between">
          <div className="flex flex-row text-[#635FC7] text-xl items-center">
            <DashboardIcon />
            <p className="ml-2 plus-jakarta font-extrabold">ProjX</p>
          </div>
          <p className="plus-jakarta text-medium_gray font-semibold w-44">
            {selectedBoard?.name}
          </p>
        </div>
        {selectedBoard && (
          <div className="flex flex-row items-center gap-4">
            <button
              className="btn bg-primary_btn_idle border-none plus-jakarta text-white hover:bg-primary_btn_hover"
              onClick={handleOpenEditBoardModal}
            >
              <AddIcon />
              Add New Column
            </button>
            <button
              className="btn bg-transparent border-none text-medium_gray hover:text-white hover:bg-primary_btn_hover"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </button>
            <Menu open={open} onClose={handleMenuClose} anchorEl={anchorEl}>
              <MenuItem
                onClick={() => {
                  handleOpenEditBoardModal();
                  handleMenuClose();
                }}
              >
                Edit Board
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleOpenDeleteBoardModal();
                  handleMenuClose();
                }}
              >
                <p className="text-red-500">Delete Board</p>
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
