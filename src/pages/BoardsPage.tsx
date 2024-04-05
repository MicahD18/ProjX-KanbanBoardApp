import { useSelector } from "react-redux";
import MainNav from "../components/MainNav";
import { useEffect, useMemo, useState } from "react";

const BoardsPage = () => {
  // 4. Use the useSelector hook to get the state.setSelectedBoard object,
  // and use the useState hook to store the selectedBoard.data in the local state.
  const selectedBoard = useSelector((state) => state.setSelectedBoard);
  // 6. Optimize the component by memoizing the selectedBoard value to avoid
  // unnecessary re-renders.
  const memoizedSelectedBoard = useMemo(() => selectedBoard, [selectedBoard]);
  const [data, setData] = useState(memoizedSelectedBoard?.data || null);

  // 5. useEffect hook to update the local data state whenever the
  // selectedBoard.data changes.
  useEffect(() => {
    setData(memoizedSelectedBoard?.data || null);
  }, [memoizedSelectedBoard?.data]);

  return (
    <div className="flex flex-row w-screen h-screen bg-cool_gray" role="boards">
      <MainNav />
      <div>
        {/* if no boards, show nothing */}
        {/* if no columns on selected board, show this */}
        {/* show content */}
        <p>boards</p>
      </div>
    </div>
  );
};

export default BoardsPage;
