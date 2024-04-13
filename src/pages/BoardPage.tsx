import { useSelector } from "react-redux";
import MainNav from "../components/MainNav";
import { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import TaskCard from "../components/TaskCard";
import Columns from "../components/Columns";
import { RootState } from "../store";
import { Column } from "../models/board.model";

const BoardPage = () => {
  // TODO: NOTE: Changes in state for subtasks don't work when using the boardReducer, however it DOES work when using boardSlice.
  // TODO: NOTE: When using boardSlice, the app crashes when using the drag and drop feature, however it DOES work when using boardReducer. (Fix this later)
  // 4. Use the useSelector hook to get the state.setSelectedBoard object,
  // and use the useState hook to store the selectedBoard.data in the local state.
  // NEW:
  // const selectedColumns = useSelector(
  //   (state: RootState) => state.board.columns
  // );
  // OLD:
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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;

    // activeId = task id
    setActiveId(id);
  };

  const findTask = (id: UniqueIdentifier | null) => {
    // find the column/container that matches the id
    const container = findValueOfItems(id, "item");
    if (!container) return null;
    const task = container.tasks.find((item) => item.id === id);
    if (!task) return null;
    return task;
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Create a copy of the columns
      const newColumns = memoizedSelectedColumns
        ? memoizedSelectedColumns.map((column) => ({ ...column }))
        : [];

      // Find the active container and over container (tasks)
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container (column)
      const activeColumnIndex = newColumns.findIndex(
        (column) => column.id === activeContainer.id
      );
      const overColumnIndex = newColumns.findIndex(
        (column) => column.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeItemIndex = activeContainer.tasks.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = activeContainer.tasks.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeColumnIndex === overColumnIndex) {
        const newItems = [...memoizedSelectedColumns!];
        // if both indexes are the same, move the active item to the position of the over item
        newItems[activeColumnIndex].tasks = arrayMove(
          newItems[activeColumnIndex].tasks,
          activeItemIndex,
          overItemIndex
        );
      } else {
        // In different containers
        const newItems = [...memoizedSelectedColumns!];
        const [removedItem] = newItems[activeColumnIndex].tasks.splice(
          activeItemIndex,
          1
        );
        newItems[overColumnIndex].tasks.splice(overItemIndex, 0, removedItem);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Create a copy of the columns
      const newColumns = memoizedSelectedColumns
        ? memoizedSelectedColumns.map((column) => ({ ...column }))
        : [];

      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = newColumns.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = newColumns.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeItemIndex = activeContainer.tasks.findIndex(
        (item) => item.id === active.id
      );
      // Remove the active item from the active container and add it to the over container
      const newItems = [...memoizedSelectedColumns!];
      const [removeditem] = newItems[activeContainerIndex!].tasks.splice(
        activeItemIndex,
        1
      );
      newItems[overContainerIndex!].tasks.push(removeditem);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Handling Item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Create a copy of the columns
      const newColumns = memoizedSelectedColumns
        ? memoizedSelectedColumns.map((column) => ({ ...column }))
        : [];

      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the active and over column indices
      const activeColumnIndex = newColumns.findIndex(
        (column) => column.id === activeContainer.id
      );
      const overColumnIndex = newColumns.findIndex(
        (column) => column.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeItemIndex = activeContainer.tasks.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = activeContainer.tasks.findIndex(
        (item) => item.id === over.id
      );

      // If the active and over columns are the same
      if (activeColumnIndex === overColumnIndex) {
        // Move the active item to the new position within the same column
        // const newTasks = [...newColumns[activeColumnIndex!].tasks];
        // const [removedItem] = newTasks.splice(activeItemIndex, 1);
        // newTasks.splice(overItemIndex, 0, removedItem);

        // newColumns[activeColumnIndex!] = {
        //   ...newColumns![activeColumnIndex!],
        //   tasks: newTasks,
        // };
        // NEW:
        newColumns[activeColumnIndex].tasks = arrayMove(
          newColumns[activeColumnIndex].tasks,
          activeItemIndex,
          overItemIndex
        );
      } else {
        // Move the active item from the active column to the over column
        // const newActiveTasks = [...newColumns[activeColumnIndex!].tasks];
        // const [removedItem] = newActiveTasks.splice(activeItemIndex, 1);

        // const newOverTasks = [...newColumns[overColumnIndex!].tasks];
        // newOverTasks.splice(overItemIndex, 0, removedItem);

        // newColumns[activeColumnIndex!] = {
        //   ...newColumns[activeColumnIndex!],
        //   tasks: newActiveTasks,
        // };
        // newColumns[overColumnIndex!] = {
        //   ...newColumns[overColumnIndex!],
        //   tasks: newOverTasks,
        // };
        // NEW:
        const [removedItem] = newColumns[activeColumnIndex].tasks.splice(
          activeItemIndex,
          1
        );
        newColumns[overColumnIndex].tasks.splice(overItemIndex, 0, removedItem);
      }
    }

    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Create a copy of the columns
      const newColumns = memoizedSelectedColumns
        ? memoizedSelectedColumns.map((column) => ({ ...column }))
        : [];

      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the active and over column indices
      const activeColumnIndex = newColumns.findIndex(
        (column) => column.id === activeContainer.id
      );
      const overColumnIndex = newColumns.findIndex(
        (column) => column.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeItemIndex = activeContainer.tasks.findIndex(
        (item) => item.id === active.id
      );

      // Move the active item from the active column to the over column
      // const newActiveTasks = [...newColumns[activeColumnIndex!].tasks];
      // const [removedItem] = newActiveTasks.splice(activeItemIndex, 1);

      // const newOverTasks = [...newColumns[overColumnIndex!].tasks];
      // newOverTasks.push(removedItem);

      // newColumns[activeColumnIndex!] = {
      //   ...newColumns[activeColumnIndex!],
      //   tasks: newActiveTasks,
      // };
      // newColumns[overColumnIndex!] = {
      //   ...newColumns[overColumnIndex!],
      //   tasks: newOverTasks,
      // };
      // NEW:
      const [removedItem] = newColumns[activeColumnIndex].tasks.splice(
        activeItemIndex,
        1
      );
      newColumns[overColumnIndex].tasks.push(removedItem);
    }

    // Clear the activeId state
    setActiveId(null);
  };

  const findValueOfItems = (id: UniqueIdentifier | null, type: string) => {
    if (type === "container") {
      return memoizedSelectedColumns?.find((column) => column.id === id);
    }
    if (type === "item") {
      return memoizedSelectedColumns?.find((column) =>
        column.tasks.find((item) => item.id === id)
      );
    }
  };

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={
                memoizedSelectedColumns
                  ? memoizedSelectedColumns.map((column) => ({ ...column }))
                  : []
              }
            >
              <Columns columns={memoizedSelectedColumns} />
              <DragOverlay adjustScale={false}>
                {activeId && (
                  <TaskCard id={activeId} task={findTask(activeId)} />
                )}
              </DragOverlay>
            </SortableContext>
          </DndContext>
          {/* <div className="mt-[120px] w-80 bg-off_gray flex flex-col items-center justify-center rounded-md">
            <button className="text-medium_gray font-semibold">
              <span className="text-lg">+</span> New Column
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
