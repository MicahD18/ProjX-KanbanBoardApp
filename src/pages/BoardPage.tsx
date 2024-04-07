import { useSelector } from "react-redux";
import MainNav from "../components/MainNav";
import { useMemo } from "react";
import { Column } from "../models/board.model";
import ColumnComponent from "../components/Column";

const BoardPage = () => {
  // 4. Use the useSelector hook to get the state.setSelectedBoard object,
  // and use the useState hook to store the selectedBoard.data in the local state.
  const selectedColumns = useSelector(
    (state: { boardReducer: { columns: Column[] | null } }) =>
      state.boardReducer?.columns
  );
  // 6. Optimize the component by memoizing the selectedBoard value to avoid
  // unnecessary re-renders.
  const memoizedSelectedColumns = useMemo(
    () => selectedColumns,
    [selectedColumns]
  );

  return (
    <div className="flex flex-row">
      <MainNav />
      <div
        className="flex flex-row h-[93vh] w-full bg-cool_gray overflow-x-scroll"
        role="boards"
      >
        <div className="flex flex-row bg-blue-200 h-full gap-8 px-12">
          {/* if no boards, show nothing */}
          {/* if no columns on selected board, show this */}
          {/* show content */}
          {memoizedSelectedColumns?.map((column: Column) => (
            <div key={column.id} className="w-80 bg-blue-400 my-12">
              <p>{column.name}</p>
              <ColumnComponent tasks={column.tasks} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
