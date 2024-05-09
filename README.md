# ProjX

A web application I built using React where you create your own kanban boards. Add containers to your board to keep track of your tasks. Create tasks and drag & drop them anywhere on your board.

![projx-project](https://github.com/MicahD18/ProjX-KanbanBoardApp/assets/70763379/171f5a65-ec6a-4c5e-b7ee-a668340a1c65)

## Installation

##### 1. 'npm install' to install the dependencies
##### 2. 'npm run dev' to run local dev server

## What I Learned

#### 1. Redux (for global state management)

Handles:
  - boards data
  - modals
  - sidebar

#### 2. Implemented a 'Drag & Drop' algorithm using the dnd-kit library

#### 3. CRUD operations for:
  - boards
  - columns
  - tasks

#### 4. Utilizing localStorage (for data integrity)

#### 5. Handling modals and user input

## Design

##### Design credit goes to: https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB (used for reference)

## Architecture / high-level design
![ProjX_system-design drawio](https://github.com/MicahD18/ProjX-KanbanBoardApp/assets/70763379/dce303b8-897f-4eeb-a152-656e112b7f49)
### Sidebar
##### The sidebar reducer handles the open/close of the sidebar component.
### Modal
##### The modal reducer sets the 'type' of modal. For example if the current modal is set to "edit", the edit modal will render.
### Board
##### The board reducer is a bit more complex in that it handles fetching the boards data, setting the board that the user selects, as well as handling actions inside the board.

## Drag & Drop Algorithm

##### To handle the drag & drop functionality in the app, I utilized the dnd-kit library. That way I could focus on implementing the logic such as sorting tasks in a container. To break it down, it is a single algorithm that contains multiple functions and involves managing the state of the dragged items, determining their positions and destinations, updating the state accordingly, and persisting those changes.

### JSX
```JSX
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
```

### handleDragStart
##### This function is called when a drag operation starts. It extracts the ID of the active task being dragged and sets it as the active ID.
```typescript
const handleDragStart = (event: DragStartEvent) => {
  const { active } = event;
  const { id } = active;

  setActiveId(id);
};
```
### findTask
##### This function takes an ID as input and tries to find the corresponding task. It searches through the columns to find the task with the provided ID. If found, it returns the task; otherwise, it returns null.
```typescript
const findTask = (id: UniqueIdentifier | null) => {
  const container = findValueOfItems(id, "item");
  if (!container) return null;
  const task = container.tasks.find((item) => item.id === id);
  if (!task) return null;
  return task;
};
```
### handleDragMove
##### This function is called when a dragged item is being moved. It determines whether the item is being moved within the same container or to a different container. If the item is moved within the same container, it updates the position of the item within the column. If the item is moved to a different container, it moves the item from one column to another.
```typescript
const handleDragMove = (event: DragMoveEvent) => {
  const { active, over } = event;

  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("item") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    const activeContainer = findValueOfItems(active.id, "item");
    const overContainer = findValueOfItems(over.id, "item");

    if (!activeContainer || !overContainer) return;

    const activeColumnIndex = newColumns.findIndex(
      (column) => column.id === activeContainer.id
    );
    const overColumnIndex = newColumns.findIndex(
      (column) => column.id === overContainer.id
    );

    const activeItemIndex = activeContainer.tasks.findIndex(
      (item) => item.id === active.id
    );
    const overItemIndex = activeContainer.tasks.findIndex(
      (item) => item.id === over.id
    );

    if (activeColumnIndex === overColumnIndex) {
      const newItems = [...memoizedSelectedColumns!];
      newItems[activeColumnIndex].tasks = arrayMove(
        newItems[activeColumnIndex].tasks,
        activeItemIndex,
        overItemIndex
      );
    } else {
      const newItems = [...memoizedSelectedColumns!];
      const [removedItem] = newItems[activeColumnIndex].tasks.splice(
        activeItemIndex,
        1
      );
      newItems[overColumnIndex].tasks.splice(overItemIndex, 0, removedItem);
    }
  }
};
```
### handleDragEnd
##### This function is called when the drag operation ends. It handles the final actions to be taken based on where the item was dropped. If the item was moved within or between columns, it updates the state to reflect the new positions of items. If the item was dropped into a container, it moves the item from one column to another. It then saves the updated state to local storage and clears the active ID.
```typescript
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
```
### findValueOfItems
##### This function is a helper function used by 'handleDragMove' and 'handleDragEnd'. It takes an ID and a type as input and searches for the corresponding container or item based on the type. If the type is "container," it finds the column with the specified ID. If the type is "item," it finds the column containing the item with the specified ID.
```typescript
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
```
