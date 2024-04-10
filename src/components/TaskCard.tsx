import { useSortable } from "@dnd-kit/sortable";
import { Task } from "../models/board.model";
import { UniqueIdentifier } from "@dnd-kit/core";

interface Props {
  id: UniqueIdentifier;
  task: Task | null;
}

const TaskCard: React.FC<Props> = ({ id, task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  return (
    <div className="card w-full bg-white shadow-md" ref={setNodeRef}>
      <div className="card-body">
        <p className="card-title text-black text-sm">{task?.title}</p>
        <p>{task?.subtasks.length} subtasks</p>
      </div>
      <button {...attributes} {...listeners}>
        Drag
      </button>
    </div>
  );
};

export default TaskCard;
