import { useDispatch, useSelector } from "react-redux";
import MainNav from "../components/MainNav";
import { useMemo, useState } from "react";
import { Column } from "../models/board.model";
import ColumnComponent from "../components/Column";
import AddIcon from "@mui/icons-material/Add";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DragItem from "../components/DragItem";
import { setColumns } from "../actions/boardActions";

const BoardPage = () => {
  const dispatch = useDispatch();

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

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

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
                collisionDetection={closestCorners}
                onDragStart={(event) => handleDragStart(event, column.id)}
                onDragOver={(event) => handleDragOver(event, column.id)}
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

  function findColumn(columnId: number, id: number) {
    // Check if memoizedSelectedColumns is null
    if (memoizedSelectedColumns) {
      // iterate over each column
      for (const column of memoizedSelectedColumns) {
        if (column.tasks.some((task) => task.id === id)) {
          return column.id;
        }
      }
      // Find the source column
      // const sourceColumn = memoizedSelectedColumns?.find(
      //   (column) => column.id === columnId
      // );
      // console.log(sourceColumn);
      // if (sourceColumn) {
      //   // Check if the id matches any task in the source column
      //   const sourceTask = sourceColumn.tasks.find((task) => task.id === id);
      //   if (sourceTask) {
      //     return {
      //       sourceColumn,
      //       sourceTask,
      //     };
      //   }
      // }
    }

    // Return null if no matching task is found
    return null;

    // // Iterate over selectedColumns to find the column with matching id
    // for (const column of memoizedSelectedColumns) {
    //   if (column.id === columnId) {
    //     // Iterate over tasks of the column to find the task with matching id
    //     for (const task of column.tasks) {
    //       if (task.id === id) {
    //         // Return the task object if found
    //         return task;
    //       }
    //     }
    //   }
    // }
  }

  function handleDragStart(event: DragStartEvent, columnId) {
    console.log(columnId);

    const { active } = event;
    const { id } = active;
    console.log(`Picked up draggable item ${id}`);

    setActiveId(id);
  }

  function handleDragOver(event, columnId) {
    console.log(columnId);

    // PROBLEM: So the problem is that the destinationId is
    // the id for a row. For example, if I move item 1 in column 1
    // to the item 3 place in column 2, the destinationId would be 3.
    // I want the destinationId to be 2 so item 1 can be dropped into column 2.
    const { active, over, draggingRect } = event;
    const { id: taskId } = active;
    const { id: destinationId } = over;

    // taskId = 1 (task selected); destinationId = 2 (row 2, on the same column)
    console.log(taskId, destinationId);

    // Find the containers
    const sourceColumn = findColumn(columnId, taskId); // active
    const destinationColumn = findColumn(columnId, destinationId); // over
    console.log(sourceColumn, destinationColumn);

    if (sourceColumn === destinationColumn) {
      // Same column; handle the move within the same column
      // Update the state accordingly
      console.log("same column");
      const updatedColumns = memoizedSelectedColumns?.map((column) => {
        if (column.id === columnId) {
          const newTasks = [...column.tasks];
          const taskIndex = newTasks.findIndex((task) => task.id === taskId);
          const [draggedTask] = newTasks.splice(taskIndex, 1);
          const dropIndex = newTasks.findIndex(
            (task) => task.id === destinationId
          );
          newTasks.splice(dropIndex, 0, draggedTask);
          return { ...column, tasks: newTasks };
        }
        return column;
      });

      // Update the state with the new column order
      // This assumes that you have a Redux action to update the columns
      // You should dispatch this action to update the state
      console.log("Updated columns within the same column", updatedColumns);
    } else {
      // Different column; handle the move between columns
      // Update the state accordingly
      console.log("different column");
    }
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;
    console.log(active, over);
    console.log(
      `Draggable item ${id} was dropped over droppable area ${overId}`
    );

    setActiveId(null);
  }
};

export default BoardPage;
