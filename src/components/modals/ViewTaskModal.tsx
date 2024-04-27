import { useEffect, useState } from "react";
import { Task } from "../../models/board.model";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";

interface Props {
  task: Task | null;
  onTaskUpdate: (updatedTask: Task) => void;
  handleEditTask: () => void;
  handleDeleteTask: () => void;
  onClose: () => void;
}

const ViewTaskModal: React.FC<Props> = ({
  task,
  onTaskUpdate,
  handleEditTask,
  handleDeleteTask,
  onClose,
}) => {
  const [completedSubtasks, setCompletedSubtasks] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // for popup menu
  const open = Boolean(anchorEl); // for popup menu

  useEffect(() => {
    if (task?.subtasks) {
      // set the initial completedSubtasks to the number of subtasks where their isCompleted property is true
      const completedCount = task.subtasks.filter(
        (subtask) => subtask.isCompleted
      ).length;
      setCompletedSubtasks(completedCount);
    }
  }, [task?.subtasks]);

  const handleSubtaskCheck = (index: number, isChecked: boolean) => {
    if (task) {
      const updatedSubtasks = task.subtasks.map((subtask, i) => {
        if (i === index) {
          return { ...subtask, isCompleted: isChecked };
        }
        return subtask;
      });
      const updatedTask: Task = { ...task, subtasks: updatedSubtasks };
      setCompletedSubtasks(
        isChecked ? completedSubtasks + 1 : completedSubtasks - 1
      );
      onTaskUpdate(updatedTask);
    }
  };

  // Menu for editing/deleting task
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="plus-jakarta">
      <div className="flex flex-row w-full justify-between">
        <h3 className="font-bold text-xl text-black">{task?.title}</h3>
        <button onClick={handleMenuOpen}>
          <MoreVertIcon />
        </button>
        <Menu open={open} onClose={handleMenuClose} anchorEl={anchorEl}>
          <MenuItem
            onClick={() => {
              handleEditTask();
              handleMenuClose();
            }}
          >
            Edit Task
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeleteTask();
              handleMenuClose();
            }}
          >
            <p className="text-red-500">Delete Task</p>
          </MenuItem>
        </Menu>
      </div>

      <p className="py-4 text-medium_gray">{task?.description}</p>
      {task?.subtasks && task.subtasks.length > 0 && (
        <p>
          Subtasks ({completedSubtasks} of {task.subtasks.length})
        </p>
      )}

      {task?.subtasks?.map((subtask, index) => (
        <div key={subtask.id} className="form-control">
          <div className="flex flex-row justify-start items-center mt-4">
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              className="checkbox checkbox-primary cursor-pointer"
              onChange={(e) => handleSubtaskCheck(index, e.target.checked)}
            />
            <span className="label-text text-[16px] ml-4 text-black font-semibold">
              {subtask.title}
            </span>
          </div>
        </div>
      ))}
      <div className="modal-action">
        <button
          className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white mt-6 h-12 hover:bg-primary_btn_hover"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewTaskModal;
