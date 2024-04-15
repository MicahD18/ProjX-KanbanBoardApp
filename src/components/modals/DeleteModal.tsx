import { Task } from "../../models/board.model";

interface Props {
  task: Task;
  onTaskDelete: (task: Task) => void;
}

const DeleteModal: React.FC<Props> = ({ task, onTaskDelete }) => {
  return (
    <div>
      <p className="text-red-500 text-lg font-semibold">Delete this task?</p>
      <p>
        Are you sure you want to delete '{task?.title}' task and its subtasks?
        This action cannot be undone.
      </p>
      <button onClick={() => onTaskDelete(task)}>Delete</button>
    </div>
  );
};

export default DeleteModal;
