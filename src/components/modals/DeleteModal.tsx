import { Board, Task } from "../../models/board.model";

interface Props {
  item: Task | Board;
  onTaskDelete?: (task: Task) => void;
  onBoardDelete?: (board: Board) => void;
  onClose: () => void;
}

function isTask(item: Task | Board): item is Task {
  return (item as Task).title !== undefined;
}

const DeleteModal: React.FC<Props> = ({
  item,
  onTaskDelete,
  onBoardDelete,
  onClose,
}) => {
  return (
    <div>
      <p className="text-red-500 text-lg font-semibold">
        {isTask(item) ? "Delete this task?" : "Delete this board?"}
      </p>
      <div className="mt-4">
        {isTask(item) ? (
          <p className="text-light_gray">
            Are you sure you want to delete '{item.title}' task and its
            subtasks? This action cannot be undone.
          </p>
        ) : (
          <p className="text-light_gray">
            Are you sure you want to delete '{(item as Board).name}' board and
            all its tasks? This action cannot be undone.
          </p>
        )}
      </div>

      <div className="flex flex-row items-center justify-around mt-8">
        <button
          className="btn btn-sm lg:btn-md bg-red-500 border-none plus-jakarta text-white h-12 hover:bg-red-200 hover:text-red-500 w-52"
          onClick={() => {
            if (isTask(item) && onTaskDelete) {
              onTaskDelete(item);
            }
            if (onBoardDelete) {
              onBoardDelete(item as Board);
            }
          }}
        >
          Delete
        </button>
        <button
          className="btn button-secondary border-none w-52"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
