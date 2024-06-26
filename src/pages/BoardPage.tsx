import { useSelector } from "react-redux";
import MainNav from "../components/MainNav";
import { useMemo, useState } from "react";
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
import { Board, Column } from "../models/board.model";
import { saveToLocalStorage } from "../utils/localStorage";
import { RootState } from "../store";

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
  const selectedBoard = useSelector(
    (state: { boardReducer: { selectedBoard: Board | null } }) =>
      state.boardReducer.selectedBoard
  );
  const boards = useSelector(
    (state: { boardReducer: { boards: Board[] } }) => state.boardReducer.boards
  );
  const sidebar = useSelector((state: RootState) => state.sidebarReducer);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const newColumns = memoizedSelectedColumns
    ? memoizedSelectedColumns.map((column) => ({
        ...column,
        tasks: [...column.tasks],
      }))
    : [];

  // Runs when a task is selected
  const handleDragStart = (event: DragStartEvent) => {
    // extract the task object (active)
    const { active } = event;
    const { id } = active;

    // Set the active id (activeId = task id)
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

  // Runs when a task is being dragged around
  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handles item sorting (same and/or different containers regardless)
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
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

      // if both indexes are in the same container, move the active item to the position of the over item
      if (activeColumnIndex === overColumnIndex) {
        const newItems = [...memoizedSelectedColumns!];
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

    // Handling Item Drop Into another Container
    // if (
    //   active.id.toString().includes("item") &&
    //   over?.id.toString().includes("container") &&
    //   active &&
    //   over &&
    //   active.id !== over.id
    // ) {
    //   console.log("working...");

    //   // Find the active and over container
    //   const activeContainer = findValueOfItems(active.id, "item");
    //   const overContainer = findValueOfItems(over.id, "container");
    //   console.log(activeContainer, overContainer);

    //   // If the active or over container is not found, return
    //   if (!activeContainer || !overContainer) return;

    //   // Find the index of the active and over container
    //   const activeContainerIndex = newColumns.findIndex(
    //     (container) => container.id === activeContainer.id
    //   );
    //   const overContainerIndex = newColumns.findIndex(
    //     (container) => container.id === overContainer.id
    //   );

    //   // Find the index of the active and over item
    //   const activeItemIndex = activeContainer.tasks.findIndex(
    //     (item) => item.id === active.id
    //   );
    //   // Remove the active item from the active container and add it to the over container
    //   const newItems = [...memoizedSelectedColumns!];
    //   const [removeditem] = newItems[activeContainerIndex].tasks.splice(
    //     activeItemIndex,
    //     1
    //   );
    //   newItems[overContainerIndex].tasks.push(removeditem);
    // }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Create a new copy of boards
    const updatedBoards = [...boards];
    // find the selectedBoard index
    const boardIndex = updatedBoards.findIndex(
      (board) => board.id === selectedBoard?.id
    );

    // Handling Item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over column
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
        // Update the tasks array without mutating the state
        updatedBoards[boardIndex].columns[activeColumnIndex].tasks = arrayMove(
          updatedBoards[boardIndex].columns[activeColumnIndex].tasks,
          activeItemIndex,
          overItemIndex
        );
      } else {
        const newActiveTasks = [
          ...updatedBoards[boardIndex].columns[activeColumnIndex].tasks.slice(
            0,
            activeItemIndex
          ),
          ...updatedBoards[boardIndex].columns[activeColumnIndex].tasks.slice(
            activeItemIndex + 1
          ),
        ];

        // Create a new tasks array for the over column with the moved item
        const newOverTasks = [
          ...updatedBoards[boardIndex].columns[overColumnIndex].tasks.slice(
            0,
            overItemIndex
          ),
          updatedBoards[boardIndex].columns[activeColumnIndex].tasks[
            activeItemIndex
          ],
          ...updatedBoards[boardIndex].columns[overColumnIndex].tasks.slice(
            overItemIndex
          ),
        ];

        // Update the tasks arrays without mutating the state
        updatedBoards[boardIndex].columns[activeColumnIndex].tasks =
          newActiveTasks;
        updatedBoards[boardIndex].columns[overColumnIndex].tasks = newOverTasks;
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
      const [removedItem] = newColumns[activeColumnIndex].tasks.splice(
        activeItemIndex,
        1
      );
      newColumns[overColumnIndex].tasks.push(removedItem);
    }

    saveToLocalStorage("boards", updatedBoards);

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
        {sidebar.currentState === true ? <MainNav /> : <></>}
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
        {sidebar.currentState === true ? <MainNav /> : <></>}
        <div className="flex flex-col items-center bg-cool_gray w-full h-screen justify-center plus-jakarta">
          <p className="text-medium_gray font-semibold text-md">
            This board is empty. Add a new column to get started.
          </p>
          {/* <button className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white mt-6 h-12 hover:bg-primary_btn_hover">
            <AddIcon />
            Add New Column
          </button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row plus-jakarta">
      {sidebar.currentState === true ? <MainNav /> : <></>}
      <div
        className="flex flex-row h-screen w-full bg-cool_gray overflow-x-scroll"
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
