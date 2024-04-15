import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { RootState } from "../store";
import { Column } from "../models/board.model";

const Header = () => {
  const selectedName = useSelector((state: RootState) => state.board.name);
  // const selectedColumns = useSelector(
  //   (state: RootState) => state.board.columns
  // );
  const selectedColumns = useSelector(
    (state: { boardReducer: { columns: Column[] | null } }) =>
      state.boardReducer?.columns
  );
  const memoizedSelectedName = useMemo(() => selectedName, [selectedName]);

  return (
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
          <button className="btn bg-primary_btn_idle border-none plus-jakarta text-white hover:bg-primary_btn_hover">
            <AddIcon />
            Add New Column
          </button>
          <button className="btn bg-transparent border-none text-medium_gray hover:text-white hover:bg-primary_btn_hover">
            <MoreVertIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
