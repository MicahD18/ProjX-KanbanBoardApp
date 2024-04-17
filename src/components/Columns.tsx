import { SortableContext } from "@dnd-kit/sortable";
import { Column, Task } from "../models/board.model";
import TaskCard from "./TaskCard";
import Dialog from "./Dialog";
import ViewTaskModal from "./modals/ViewTaskModal";
import { useDispatch, useSelector } from "react-redux";
// import { setSelectedTask } from "../slices/boardSlice";
// import { RootState } from "../store";
import {
  updateTask,
  setSelectedTask,
  setColumns,
} from "../actions/boardActions";
import EditTaskModal from "./modals/EditTaskModal";
import DeleteModal from "./modals/DeleteModal";
import {
  closeModal,
  openCreateModal,
  openDeleteModal,
  openEditModal,
  openViewModal,
} from "../actions/modalActions";
import { RootState } from "../store";

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
  // const selectedTask = useSelector(
  //   (state: RootState) => state.board.selectedTask
  // );
  const selectedTask = useSelector(
    (state: { boardReducer: { selectedTask: Task | null } }) =>
      state.boardReducer.selectedTask
  );

  // View task modal:
  const handleOpenViewModal = (task?: Task) => {
    if (task) dispatch(setSelectedTask(task));
    dispatch(openViewModal());
  };

  const handleOpenEditModal = () => {
    dispatch(openEditModal());
  };

  const handleOpenDeleteModal = () => {
    dispatch(openDeleteModal());
  };

  const handleOpenCreateModal = () => {
    dispatch(openCreateModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  // handle task deletion:
  const handleTaskDelete = (task: Task) => {
    const updatedColumns = columns?.map((column) => ({
      ...column,
      tasks: column.tasks.filter((t) => t.id !== task.id),
    }));

    if (updatedColumns) {
      dispatch(setColumns(updatedColumns));
      handleCloseModal();
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    dispatch(updateTask(updatedTask));
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
            task={selectedTask}
            onSaveTask={handleTaskUpdate}
            onClose={handleOpenViewModal}
          />
        )}
      </Dialog>
      {/* DELETE TASK DIALOG */}
      <Dialog isOpen={currentModal === "delete"}>
        {selectedTask && (
          <DeleteModal
            item={selectedTask}
            onTaskDelete={handleTaskDelete}
            onClose={handleOpenViewModal}
          />
        )}
      </Dialog>
      {/* CREATE TASK DIALOG */}
      <Dialog isOpen={currentModal === "create"}>
        <EditTaskModal
          onSaveTask={handleTaskUpdate}
          onClose={handleCloseModal}
        />
      </Dialog>
      {columns?.map((column: Column) => (
        // container/column
        <div key={column.id} className="w-80 my-12">
          {/* top-part of container/column */}
          <div className="flex flex-row items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-xl"></div>
            <p>
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
                onClick={handleOpenCreateModal}
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
