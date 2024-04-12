/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardIcon from "@mui/icons-material/Dashboard";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AddIcon from "@mui/icons-material/Add";

import { boards } from "../data/data.json";

// models
import { Board, Column } from "../models/board.model";
import { useDispatch } from "react-redux";
import { setName, setColumns } from "../slices/boardSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  // get the columns from the selected board
  const handleSelectBoard = (columns: Column[], name: string) => {
    // 1. dispatch the setColumns action with the selected board data
    dispatch(setColumns(columns)); // columns -> BoardsPage component
    dispatch(setName(name)); // name -> Header component
  };

  return (
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
          <div className="flex flex-col gap-3 mt-6">
            {boards.map((board: Board) => (
              <button
                key={board.id}
                onClick={() => handleSelectBoard(board.columns, board.name)}
                className="py-2 text-medium_gray font-semibold flex flex-row gap-2 cursor-pointer px-2 hover:bg-primary_btn_hover hover:text-white rounded-md transition duration-300"
              >
                <SpaceDashboardIcon />
                {/* MAX LENGTH: 24 Characters */}
                <p>{board.name}</p>
              </button>
            ))}
          </div>
          <button className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white mt-6 h-12 hover:bg-primary_btn_hover">
            <AddIcon />
            Create New Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
