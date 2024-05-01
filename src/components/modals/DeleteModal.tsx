import { Board, Task } from "../../models/board.model";

interface Props {
  task?: Task | null;
  board?: Board | null;
  onTaskDelete?: (task: Task) => void;
  onBoardDelete?: (board: Board) => void;
  onClose: () => void;
}

const DeleteModal: React.FC<Props> = ({
  task,
  board,
  onTaskDelete,
  onBoardDelete,
  onClose,
}) => {
  return (
    <div>
      <p className="text-red-500 text-lg font-semibold">
        {task ? "Delete this task?" : "Delete this board?"}
      </p>
      <div className="mt-4">
        {task ? (
          <p className="text-light_gray">
            Are you sure you want to delete '{task.title}' task and its
            subtasks? This action cannot be undone.
          </p>
        ) : (
          <p className="text-light_gray">
            Are you sure you want to delete '{board?.name}'? This action will
            remove all columns and tasks and cannot be undone.
          </p>
        )}
      </div>

      <div className="flex flex-row items-center justify-around mt-8">
        <button
          className="btn btn-sm lg:btn-md bg-red-500 border-none plus-jakarta text-white h-12 hover:bg-red-200 hover:text-red-500 w-[45%]"
          onClick={() => {
            if (task && onTaskDelete) {
              onTaskDelete(task);
            }
            if (onBoardDelete && board) {
              onBoardDelete(board);
            }
          }}
        >
          Delete
        </button>
        <button
          className="btn button-secondary border-none w-[45%]"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
