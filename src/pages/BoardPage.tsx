import { useSelector } from "react-redux";
import MainNav from "../components/MainNav";
import { useMemo, useState } from "react";
import { Column } from "../models/board.model";
import ColumnComponent from "../components/Column";
import AddIcon from "@mui/icons-material/Add";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DragItem from "../components/DragItem";

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

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  {
    /* if no boards selected yet */
  }
  if (!selectedColumns) {
    return (
      <div className="flex flex-row">
        <MainNav />
        <div className="flex flex-col items-center bg-cool_gray w-full h-screen justify-center plus-jakarta"></div>
      </div>
    );
  }

  {
    /* if no columns */
  }
  if (selectedColumns?.length === 0) {
    return (
      <div className="flex flex-row">
        <MainNav />
        <div className="flex flex-col items-center bg-cool_gray w-full h-screen justify-center plus-jakarta">
          <p className="text-medium_gray font-semibold text-md">
            This board is empty. Create a new column to get started.
          </p>
          <button className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white mt-6 h-12 hover:bg-primary_btn_hover">
            <AddIcon />
            Add New Column
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <MainNav />
      <div
        className="flex flex-row h-[93vh] w-full bg-cool_gray overflow-x-scroll"
        role="boards"
      >
        <div
          className={`flex flex-row bg-cool_gray h-full gap-8 px-12 ${
            memoizedSelectedColumns?.length === 0 ? "w-full" : ""
          }`}
        >
          {/* if no columns, show nothing */}
          {/* if no columns on selected board, show this */}
          {/* show content */}
          {memoizedSelectedColumns?.map((column: Column) => (
            <div key={column.id} className="w-80 my-12">
              <div className="flex flex-row items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-xl"></div>
                <p>
                  {column.name.toLocaleUpperCase()} ({column.tasks.length})
                </p>
              </div>
              <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              >
                <ColumnComponent id={String(column.id)} tasks={column.tasks} />
                {column.tasks.map((task) => (
                  <DragOverlay key={task.id}>
                    {activeId ? <DragItem task={task} /> : null}
                  </DragOverlay>
                ))}
              </DndContext>
            </div>
          ))}
          <div className="mt-[120px] w-80 bg-off_gray flex flex-col items-center justify-center rounded-md">
            <button className="text-medium_gray font-semibold">
              <span className="text-lg">+</span> New Column
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function handleDragStart(event) {
    console.log(`Picked up draggable item.`);
    const { active } = event;
    const { id } = active;
    console.log(active);

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;

    if (over) {
      const { id: overId } = over;
      console.log(active, over, draggingRect);
    } else {
      console.log("No drop target.");
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;
    console.log(active, over);

    setActiveId(null);
  }
};

export default BoardPage;
