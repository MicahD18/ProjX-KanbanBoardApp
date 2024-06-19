import DashboardIcon from "@mui/icons-material/Dashboard";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import { RootState } from "../store";
import { Board } from "../models/board.model";
// import { Menu, MenuItem } from "@mui/material";
import {
  closeModal,
  openDeleteBoardModal,
  openEditBoardModal,
} from "../actions/modalActions";
import Dialog from "./Dialog";
import EditBoardModal from "./modals/EditBoardModal";
import { setBoard, setBoards, setColumns } from "../actions/boardActions";
import DeleteModal from "./modals/DeleteModal";
import { saveToLocalStorage } from "../utils/localStorage";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { logout } from "../slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
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
  // TODO: Change all useSelectors in app to selectedBoard instead of board
  const selectedBoard = useSelector(
    (state: { boardReducer: { selectedBoard: Board | null } }) =>
      state.boardReducer.selectedBoard
  );
  const sidebar = useSelector((state: RootState) => state.sidebarReducer);
  // const memoizedSelectedName = useMemo(() => selectedName, [selectedName]);
  // const [, setAnchorEl] = useState<null | HTMLElement>(null); // for popup menu
  // const open = Boolean(anchorEl); // for popup menu

  // useEffect(() => {
  //   console.log(selectedBoard);
  //   console.log(boards);
  // }, [selectedBoard, boards]);

  // Menu for editing/deleting board
  // const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

  const handleOpenEditBoardModal = () => {
    dispatch(openEditBoardModal());
  };

  const handleOpenDeleteBoardModal = () => {
    dispatch(openDeleteBoardModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleBoardUpdate = (updatedBoard: Board) => {
    const updatedBoards = boards
      ? boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        )
      : [];
    // save the updated boards array to local storage
    saveToLocalStorage("boards", updatedBoards);
    dispatch(setBoards(updatedBoards));
    dispatch(setBoard(updatedBoard));
    dispatch(setColumns(updatedBoard.columns));
  };

  const handleBoardDelete = (board: Board) => {
    const updatedBoards = boards.filter((item) => item.id !== board.id);
    console.log(updatedBoards);
    dispatch(setBoards(updatedBoards));

    // save the updated boards array to local storage
    saveToLocalStorage("boards", updatedBoards);

    dispatch(setBoard(null));
    dispatch(setColumns(null));
    handleCloseModal();
  };

  // const handleSignOut = () => {
  //   // You can add more validation logic here
  //   // Dispatch login action
  //   dispatch(logout());
  //   // Redirect to the home page
  //   navigate("/sign-in");
  // };

  return (
    <header>
      {/* EDIT BOARD DIALOG */}
      <Dialog isOpen={currentModal === "edit_board"}>
        {selectedBoard && (
          <EditBoardModal
            onClose={handleCloseModal}
            board={selectedBoard}
            onSaveBoard={handleBoardUpdate}
            onBoardDelete={handleOpenDeleteBoardModal}
          />
        )}
      </Dialog>
      {/* DELETE BOARD DIALOG */}
      <Dialog isOpen={currentModal === "delete_board_modal"}>
        {selectedBoard && (
          <DeleteModal
            board={selectedBoard}
            onBoardDelete={handleBoardDelete}
            onClose={handleOpenEditBoardModal}
          />
        )}
      </Dialog>
      <div
        role="header"
        className="w-full bg-white h-20 flex flex-row justify-between items-center px-2 pl-4 md:pl-8"
      >
        <div
          className={`flex flex-row justify-start sm:justify-between items-center mt-1 w-full ${
            sidebar.currentState === true ? "sm:w-[450px]" : "sm:w-[250px]"
          }`}
        >
          <div className="flex flex-row text-[#635FC7] text-xl items-center">
            <DashboardIcon />
            <p className="ml-2 plus-jakarta font-extrabold hidden sm:block">
              ProjX
            </p>
          </div>
          {location.pathname !== "/sign-in" &&
            location.pathname !== "/sign-up" && (
              <p className="plus-jakarta text-medium_gray font-semibold ml-4 pr-0 sm:ml-0 w-36">
                {selectedBoard?.name}
              </p>
            )}
        </div>
        {location.pathname !== "/sign-in" &&
          location.pathname !== "/sign-up" && (
            <div className="flex flex-row items-center gap-4">
              {selectedBoard && (
                <button
                  className="btn bg-primary_btn_idle border-none plus-jakarta text-white hover:bg-primary_btn_hover btn-sm sm:btn-md mr-5"
                  onClick={handleOpenEditBoardModal}
                >
                  <EditIcon />
                  <p className="hidden sm:block">Edit Board</p>
                </button>
              )}
              {/* <button
                className="btn bg-transparent border-none text-medium_gray hover:text-white hover:bg-primary_btn_hover mr-5"
                onClick={handleSignOut}
              >
                <LogoutIcon />
                <p className="hidden sm:block">Sign Out</p>
              </button> */}
            </div>
          )}

        {/* // TODO: Add Menu for Profile - My Account, Support & Feedback, Language, Dark/Light Mode, Logout */}
        {/* <Menu open={open} onClose={handleMenuClose} anchorEl={anchorEl}>
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
            </Menu> */}
      </div>
    </header>
  );
};

export default Header;
