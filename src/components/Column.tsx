import { Task } from "../models/board.model";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  tasks: Task[];
}

const Column: React.FC<Props> = ({ id, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div>
      {/* {tasks.map((task: Task) => (
        <div className="card w-full bg-white shadow-md" key={task.id}>
          <div className="card-body">
            <p className="card-title text-black text-sm">{task.title}</p>
            <p>{task.subtasks.length} subtasks</p>
          </div>
        </div>
      ))} */}
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className="flex flex-col gap-4 py-6 px-3 rounded-md mt-12 mb-12 bg-off_gray"
        >
          {tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;
