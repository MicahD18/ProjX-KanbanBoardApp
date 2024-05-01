import { useEffect, useState } from "react";
import { Subtask, Task } from "../../models/board.model";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";

interface Props {
  modalType: string;
  task?: Task;
  onSaveTask: (updatedTask: Task) => void;
  onCreateTask?: (newTask: Task) => void;
  onClose: () => void;
}

const EditTaskModal: React.FC<Props> = ({
  modalType,
  task,
  onSaveTask,
  onCreateTask,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);

  // Keep track of the original task data
  const [originalTask, setOriginalTask] = useState<Task | null>(null);

  // State to track subtask input errors
  const [subtaskInputErrors, setSubtaskInputErrors] = useState<
    Record<number, string>
  >({});

  // Listen for changes in the task prop and update the state
  useEffect(() => {
    if (modalType === "edit" && task) {
      setTitle(task.title);
      setDescription(task.description);
      setSubtasks(task.subtasks);
      setOriginalTask({ ...task });
    }
    if (modalType === "create") {
      // Create new task object and bind the properties to the states for user input
      const newTask: Task = {
        id: `item-${uuidv4()}`,
        title: "",
        description: "",
        status: "",
        subtasks: [],
      };
      setTitle(newTask.title);
      setDescription(newTask.description);
      setSubtasks(newTask.subtasks);
      setOriginalTask(null);
    }
  }, [task, modalType]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubtaskChange = (index: number, title: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = {
      ...updatedSubtasks[index],
      title,
    };
    setSubtasks(updatedSubtasks);
    setSubtaskInputErrors((prevErrors) => ({
      ...prevErrors,
      [index]: title.trim() === "" ? "Can't be empty" : "",
    }));
  };

  const handleRemoveSubtask = (subtask: Subtask) => {
    const updatedSubtasks = subtasks.filter((item) => item !== subtask);
    setSubtasks(updatedSubtasks);
    setSubtaskInputErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[subtasks.indexOf(subtask)];
      return newErrors;
    });
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      id: subtasks.length + 1,
      title: "",
      isCompleted: false,
    };
    const updatedSubtasks = [...subtasks, newSubtask];
    setSubtasks(updatedSubtasks);
  };

  const handleSaveTask = () => {
    // Check if all subtask inputs are filled
    const hasEmptySubtasks = subtasks.some(
      (subtask) => subtask.title.trim() === ""
    );
    if (hasEmptySubtasks) {
      subtasks.forEach((subtask, index) => {
        setSubtaskInputErrors((prevErrors) => ({
          ...prevErrors,
          [index]: subtask.title.trim() === "" ? "Can't be empty" : "",
        }));
      });
      return;
    }

    if (task) {
      const updatedTask: Task = {
        ...task,
        title,
        description,
        subtasks,
      };
      onSaveTask(updatedTask);
      onClose();
    }
  };

  const handleCreateTask = () => {
    // Check if all subtask inputs are filled
    const hasEmptySubtasks = subtasks.some(
      (subtask) => subtask.title.trim() === ""
    );
    if (hasEmptySubtasks) {
      subtasks.forEach((subtask, index) => {
        setSubtaskInputErrors((prevErrors) => ({
          ...prevErrors,
          [index]: subtask.title.trim() === "" ? "Can't be empty" : "",
        }));
      });
      return;
    }
    const newTask: Task = {
      id: `item-${uuidv4()}`,
      title,
      description,
      status: "",
      subtasks,
    };

    if (onCreateTask) {
      onCreateTask(newTask);
    }
    onClose();
    setTitle("");
    setDescription("");
    setSubtasks([]);
  };

  const handleCancel = () => {
    if (originalTask) {
      // Restore the state to the original task data
      setTitle(originalTask.title);
      setDescription(originalTask.description);
      setSubtasks(originalTask.subtasks);
      setSubtaskInputErrors({});
      onClose();
    }
    onClose();
  };

  return (
    <div className="plus-jakarta">
      <div className="flex flex-row w-full justify-between">
        {task ? (
          <h3 className="font-bold text-lg text-black">Edit Task</h3>
        ) : (
          <h3 className="font-bold text-lg text-black">Add New Task</h3>
        )}
      </div>
      <div className="form-group flex flex-col mt-4">
        <label htmlFor="title" className="mb-2 text-gray-500">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="input input-bordered bg-white border-gray-200 border-2 text-black focus:border-primary_btn_idle"
        />
      </div>
      <div className="form-group flex flex-col mt-4">
        <label htmlFor="description" className="mb-2 text-gray-500">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="textarea textarea-bordered bg-white border-gray-200 border-2 text-black focus:border-primary_btn_idle"
        />
      </div>
      <p className="mt-4 text-gray-500">Subtasks</p>
      <div className="flex flex-col gap-3 my-2">
        {subtasks.map((subtask, index) => (
          <div
            key={index}
            className="form-group flex flex-row items-center gap-1"
          >
            <input
              type="text"
              value={subtask.title}
              onChange={(e) => handleSubtaskChange(index, e.target.value)}
              className={`input input-bordered bg-white border-gray-200 text-black w-full border-2 focus:border-primary_btn_idle ${
                subtaskInputErrors[index] ? "border-red-500" : ""
              }`}
            />
            {subtaskInputErrors[index] && (
              <span className="text-red-500 text-sm">
                {subtaskInputErrors[index]}
              </span>
            )}
            <button
              className="btn bg-transparent border-none text-medium_gray hover:text-white hover:bg-primary_btn_hover"
              onClick={() => handleRemoveSubtask(subtask)}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn button-secondary w-full border-none mt-3"
        onClick={handleAddSubtask}
      >
        <AddIcon />
        Add New Subtask
      </button>
      {task && (
        <div className="modal-actions flex flex-row gap-3 items-center mt-8 justify-between">
          <button
            className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white h-12 hover:bg-primary_btn_hover w-[45%]"
            onClick={handleSaveTask}
          >
            Save Changes
          </button>
          <button
            className="btn button-secondary border-none w-[45%]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
      {!task && (
        <div className="modal-actions flex flex-row gap-3 items-center mt-8 justify-between">
          <button
            className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white h-12 hover:bg-primary_btn_hover w-[45%]"
            onClick={handleCreateTask}
            disabled={title === ""}
          >
            Create Task
          </button>
          <button
            className="btn button-secondary border-none w-[45%]"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EditTaskModal;
