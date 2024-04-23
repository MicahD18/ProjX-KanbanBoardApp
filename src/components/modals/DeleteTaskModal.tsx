import { Task } from "../../models/board.model";

interface Props {
  task: Task;
  onTaskDelete: (task: Task) => void;
  onClose: () => void;
}

const DeleteTaskModal: React.FC<Props> = ({ task, onTaskDelete, onClose }) => {
  return (
    <div>
      <p className="text-red-500 text-lg font-semibold">Delete this task?</p>
      <div className="mt-4">
        <p className="text-light_gray">
          Are you sure you want to delete '{task.title}' task and its subtasks?
          This action cannot be undone.
        </p>
      </div>

      <div className="flex flex-row items-center justify-around mt-8">
        <button
          className="btn btn-sm lg:btn-md bg-red-500 border-none plus-jakarta text-white h-12 hover:bg-red-200 hover:text-red-500 w-52"
          onClick={() => onTaskDelete(task)}
        >
          Delete
        </button>
        <button
          className="btn button-secondary border-none w-52"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
