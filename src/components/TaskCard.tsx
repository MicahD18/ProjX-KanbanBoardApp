import { useSortable } from "@dnd-kit/sortable";
import { Task } from "../models/board.model";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface Props {
  id: UniqueIdentifier;
  task: Task | null;
  handleOpenModal?: (task: Task) => void;
}

const TaskCard: React.FC<Props> = ({ id, task, handleOpenModal }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const handleClick = () => {
    if (task && handleOpenModal) {
      handleOpenModal(task);
    }
  };

  return (
    <div
      className={`card w-full bg-white shadow-md ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div className="card-body">
        <div className="flex flex-row">
          <p
            className="card-title text-black text-sm transition duration-150 hover:text-gray-400"
            onClick={handleClick}
          >
            {task?.title}
          </p>
          <button {...listeners} className="cursor-grab">
            <DragIndicatorIcon />
          </button>
        </div>

        {task !== null &&
          task?.subtasks !== null &&
          task.subtasks.length > 0 && <p>{task?.subtasks.length} subtasks</p>}
      </div>
    </div>
  );
};

export default TaskCard;
