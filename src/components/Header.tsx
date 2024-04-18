import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { RootState } from "../store";
import { Column, Board } from "../models/board.model";
import { Menu, MenuItem } from "@mui/material";
import { closeModal, openEditBoardModal } from "../actions/modalActions";
import Dialog from "./Dialog";
import EditBoardModal from "./modals/EditBoardModal";

const Header = () => {
  const dispatch = useDispatch();
  // State that handles the modals
  const { currentModal } = useSelector(
    (state: RootState) => state.modalReducer
  );

  const selectedName = useSelector((state: RootState) => state.board.name);
  // const selectedColumns = useSelector(
  //   (state: RootState) => state.board.columns
  // );
  const selectedBoard = useSelector(
    (state: { boardReducer: { board: Board | null } }) =>
      state.boardReducer?.board
  );
  const selectedColumns = useSelector(
    (state: { boardReducer: { columns: Column[] | null } }) =>
      state.boardReducer?.columns
  );
  const memoizedSelectedName = useMemo(() => selectedName, [selectedName]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // for popup menu
  const open = Boolean(anchorEl); // for popup menu

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

  return (
    <>
      {/* EDIT BOARD DIALOG */}
      <Dialog isOpen={currentModal === "edit_board"}>
        {selectedBoard && (
          <EditBoardModal onClose={handleCloseModal} board={selectedBoard} />
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
            {memoizedSelectedName}
          </p>
        </div>
        {selectedColumns !== null && selectedColumns.length > 0 && (
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
