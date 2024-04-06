import { useSelector } from "react-redux";
import MainNav from "../components/MainNav";
import { useMemo } from "react";
import { Column } from "../models/board.model";

const BoardPage = () => {
  // 4. Use the useSelector hook to get the state.setSelectedBoard object,
  // and use the useState hook to store the selectedBoard.data in the local state.
  const selectedColumns = useSelector(
    (state: { columnsReducer: { columns: Column[] | null } }) =>
      state.columnsReducer?.columns
  );
  // 6. Optimize the component by memoizing the selectedBoard value to avoid
  // unnecessary re-renders.
  const memoizedSelectedColumns = useMemo(
    () => selectedColumns,
    [selectedColumns]
  );

  // // Memoize the selector function
  // const selectedColumnsSelector = useMemo(
  //   () => (state: { selectedBoardReducer: { data: Column[] | null } }) =>
  //     state.selectedBoardReducer?.data || [],
  //   shallow
  // );

  // // Use the memoized selector function
  // const selectedColumns = useSelector(selectedColumnsSelector);

  // If selectedBoard is null, render a loading message or return null
  // if (memoizedSelectedBoard === undefined) {
  //   return <p>Loading...</p>; // You can change this to any loading indicator you want
  // }

  return (
    <div className="flex flex-row w-screen h-screen bg-cool_gray" role="boards">
      <MainNav />
      <div>
        {/* if no boards, show nothing */}
        {/* if no columns on selected board, show this */}
        {/* show content */}
        {memoizedSelectedColumns?.map((column: Column) => (
          <div key={column.name}>{column.name}</div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
