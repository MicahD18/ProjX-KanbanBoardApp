import { SortableContext } from "@dnd-kit/sortable";
import { Column, Task } from "../models/board.model";
import TaskCard from "./TaskCard";
import { useState } from "react";
import Dialog from "./Dialog";
import ViewTaskModal from "./modals/ViewTaskModal";
import { useDispatch, useSelector } from "react-redux";
// import { setSelectedTask } from "../slices/boardSlice";
// import { RootState } from "../store";
import { updateTask, setSelectedTask } from "../actions/boardActions";
import EditTaskModal from "./modals/EditTaskModal";
import DeleteModal from "./modals/DeleteModal";

interface Props {
  columns: Column[] | null;
}

const Columns: React.FC<Props> = ({ columns }) => {
  // TODO: NOTE: If you select the TaskCard that's been dragged, after dragging it,
  // TODO: it gives you the following error: Uncaught Error: A state mutation was detected between dispatches, in the path 'boardReducer.columns.0.tasks.0'.  This may cause incorrect behavior.
  // TODO: NOTE: Try using the built-in state management provided by the @dnd-kit/core library. This way, we can avoid the direct state mutation in the reducer
  // TODO: and handle the drag and drop logic in a more straightforward manner.
  // State that handles the modals
  const [currentModal, setCurrentModal] = useState<
    "view" | "edit" | "delete" | null
  >(null);

  const dispatch = useDispatch();
  // const selectedTask = useSelector(
  //   (state: RootState) => state.board.selectedTask
  // );
  const selectedTask = useSelector(
    (state: { boardReducer: { selectedTask: Task | null } }) =>
      state.boardReducer.selectedTask
  );

  // View task modal:
  const handleOpenModal = (task: Task) => {
    dispatch(setSelectedTask(task));
    setCurrentModal("view");
  };

  // Edit task modal:
  const handleEditTask = () => {
    setCurrentModal("edit");
  };

  // Open delete modal:
  const openDeleteModal = () => {
    setCurrentModal("delete");
  };

  // handle task deletion:
  const handleTaskDelete = (task: Task) => {
    console.log("Handle delete task:", task);

    const updatedColumns = [...columns!];
    console.log(updatedColumns);
    updatedColumns.map((value: Column, index: number) => {
      value.tasks.map((item, i) => {
        if (item === task) {
          console.log(index, i);
          value.tasks.splice(index, 1);
        }
      });
    });

    setCurrentModal(null);
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
            onClose={() => setCurrentModal(null)}
            task={selectedTask}
            onTaskUpdate={handleTaskUpdate}
            handleEditTask={handleEditTask}
            handleDeleteTask={openDeleteModal}
          />
        )}
      </Dialog>
      {/* EDIT TASK DIALOG */}
      <Dialog isOpen={currentModal === "edit"}>
        {selectedTask && (
          <EditTaskModal
            task={selectedTask}
            onSaveTask={handleTaskUpdate}
            onClose={() => setCurrentModal("view")}
          />
        )}
      </Dialog>
      <Dialog isOpen={currentModal === "delete"}>
        {selectedTask && (
          <DeleteModal
            item={selectedTask}
            onTaskDelete={handleTaskDelete}
            onClose={() => setCurrentModal("view")}
          />
        )}
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
                  handleOpenModal={handleOpenModal}
                />
              ))}
              <button className="text-medium_gray font-semibold hover:bg-gray-300 py-2 transition duration-300 rounded-md">
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
