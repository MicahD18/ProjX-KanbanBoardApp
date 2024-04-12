import { SortableContext } from "@dnd-kit/sortable";
import { Column, Task } from "../models/board.model";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import TaskModal from "./modals/TaskModal";
import { openModal } from "../reducers/modalReducer";
import { useState } from "react";

interface Props {
  columns: Column[] | null;
}

const Columns: React.FC<Props> = ({ columns }) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: { modalReducer: { isOpen: boolean } }) => state.modalReducer.isOpen
  );

  const [selectedTask, setSelectedTask] = useState<any>();

  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
    console.log(selectedTask);
    dispatch(openModal());
  };

  return (
    <>
      {isModalOpen && <TaskModal />}
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
