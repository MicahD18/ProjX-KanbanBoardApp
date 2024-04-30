import { SortableContext } from "@dnd-kit/sortable";
import { Board, Column, Task } from "../models/board.model";
import TaskCard from "./TaskCard";
import Dialog from "./Dialog";
import ViewTaskModal from "./modals/ViewTaskModal";
import { useDispatch, useSelector } from "react-redux";
// import { setSelectedTask } from "../slices/boardSlice";
// import { RootState } from "../store";
import { setSelectedTask, setColumns } from "../actions/boardActions";
import EditTaskModal from "./modals/EditTaskModal";
import {
  closeModal,
  openCreateModal,
  openDeleteTaskModal,
  openEditModal,
  openViewModal,
} from "../actions/modalActions";
import { RootState } from "../store";
import { useState } from "react";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import { updateBoardWithColumns } from "../utils/boardUtils";

interface Props {
  columns: Column[] | null;
}

const Columns: React.FC<Props> = ({ columns }) => {
  // TODO: NOTE: If you select the TaskCard that's been dragged, after dragging it,
  // TODO: it gives you the following error: Uncaught Error: A state mutation was detected between dispatches, in the path 'boardReducer.columns.0.tasks.0'.  This may cause incorrect behavior.
  // TODO: NOTE: Try using the built-in state management provided by the @dnd-kit/core library. This way, we can avoid the direct state mutation in the reducer
  // TODO: and handle the drag and drop logic in a more straightforward manner.
  const dispatch = useDispatch();
  // State that handles the modals
  const { currentModal } = useSelector(
    (state: RootState) => state.modalReducer
  );
  const boards = useSelector(
    (state: { boardReducer: { boards: Board[] } }) => state.boardReducer.boards
  );
  // const selectedTask = useSelector(
  //   (state: RootState) => state.board.selectedTask
  // );
  const selectedBoard = useSelector(
    (state: { boardReducer: { board: Board | null } }) =>
      state.boardReducer.board
  );
  const selectedTask = useSelector(
    (state: { boardReducer: { selectedTask: Task | null } }) =>
      state.boardReducer.selectedTask
  );
  // column id state to keep track and know which column a task is in
  const [columnIndex, setColumnIndex] = useState<number>(0);

  // View task modal:
  const handleOpenViewModal = (task?: Task) => {
    if (task) dispatch(setSelectedTask(task));
    dispatch(openViewModal());
  };

  const handleOpenEditModal = () => {
    dispatch(openEditModal());
  };

  const handleOpenDeleteModal = () => {
    dispatch(openDeleteTaskModal());
  };

  const handleOpenCreateModal = (columnIndex: number) => {
    setColumnIndex(columnIndex);
    dispatch(openCreateModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    dispatch(setSelectedTask(null));
    setColumnIndex(0);
  };

  // handle task deletion:
  const handleTaskDelete = (task: Task) => {
    if (columns) {
      const updatedColumns = columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((t) => t.id !== task.id),
      }));

      // Update the columns in the Redux store
      dispatch(setColumns(updatedColumns));

      // Update the board with the updated columns
      updateBoardWithColumns(dispatch, boards, selectedBoard, updatedColumns);

      handleCloseModal();
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    // dispatch(updateTask(updatedTask));
    // console.log(boards);
    if (columns) {
      const updatedColumns = columns.map((column) => {
        // Find the column that contains the task we want to update
        const taskIndex = column.tasks.findIndex(
          (t) => t.id === updatedTask.id
        );

        if (taskIndex !== -1) {
          // If the task is found in this column, create a new tasks array
          // with the updated task replacing the old one
          const updatedTasks = [
            ...column.tasks.slice(0, taskIndex),
            updatedTask,
            ...column.tasks.slice(taskIndex + 1),
          ];

          // Return the updated column with the new tasks array
          return {
            ...column,
            tasks: updatedTasks,
          };
        }
        // If the task is not in this column, return the column unchanged
        return column;
      });

      // Update the columns in the Redux store
      dispatch(setColumns(updatedColumns));
      // Update the selectedTask in the Redux store
      dispatch(setSelectedTask(updatedTask));

      // Update the board with the updated columns
      updateBoardWithColumns(dispatch, boards, selectedBoard, updatedColumns);
    }
  };

  const handleTaskCreate = (newTask: Task) => {
    if (columns) {
      const updatedColumns = columns.map((column, index) => {
        if (index === columnIndex) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });

      // Update the columns in the Redux store
      dispatch(setColumns(updatedColumns));

      // Update the board with the updated columns
      updateBoardWithColumns(dispatch, boards, selectedBoard, updatedColumns);

      handleCloseModal();
    }
  };

  return (
    <>
      {/* VIEW TASK DIALOG */}
      <Dialog isOpen={currentModal === "view"}>
        {selectedTask && (
          <ViewTaskModal
            onClose={handleCloseModal}
            task={selectedTask}
            onTaskUpdate={handleTaskUpdate}
            handleEditTask={handleOpenEditModal}
            handleDeleteTask={handleOpenDeleteModal}
          />
        )}
      </Dialog>
      {/* EDIT TASK DIALOG */}
      <Dialog isOpen={currentModal === "edit"}>
        {selectedTask && (
          <EditTaskModal
            modalType="edit"
            task={selectedTask}
            onSaveTask={handleTaskUpdate}
            onClose={handleOpenViewModal}
          />
        )}
      </Dialog>
      {/* DELETE TASK DIALOG */}
      <Dialog isOpen={currentModal === "delete_task_modal"}>
        {selectedTask && (
          <DeleteTaskModal
            task={selectedTask}
            onTaskDelete={handleTaskDelete}
            onClose={handleOpenViewModal}
          />
        )}
      </Dialog>
      {/* CREATE TASK DIALOG */}
      <Dialog isOpen={currentModal === "create"}>
        <EditTaskModal
          modalType="create"
          onSaveTask={handleTaskUpdate}
          onCreateTask={handleTaskCreate}
          onClose={handleCloseModal}
        />
      </Dialog>
      {columns?.map((column: Column, index: number) => (
        // container/column
        <div key={column.id} className="w-80 my-12">
          {/* top-part of container/column */}
          <div className="flex flex-row items-center gap-2">
            {/* <div className="w-4 h-4 bg-primary_btn_idle rounded-xl"></div> */}
            <p className="tracking-wider text-gray-600 font-semibold ml-2 text-sm">
              {column.name.toLocaleUpperCase()} ({column.tasks.length})
            </p>
          </div>

          {/* items inside container/column */}
          <SortableContext
            // id={id}
            items={column.tasks.map((i) => i.id)}
            // strategy={verticalListSortingStrategy}
          >
            <div
              // ref={setNodeRef}
              className="flex flex-col gap-4 py-6 px-3 rounded-md my-12 bg-off_gray"
            >
              {column.tasks.map((task: Task) => (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  task={task}
                  handleOpenModal={handleOpenViewModal}
                />
              ))}
              <button
                className="text-medium_gray font-semibold hover:bg-gray-300 py-2 transition duration-300 rounded-md"
                onClick={() => handleOpenCreateModal(index)}
              >
                <span className="text-lg">+</span> New Task
              </button>
            </div>
          </SortableContext>
        </div>
      ))}
    </>
  );
};

export default Columns;
