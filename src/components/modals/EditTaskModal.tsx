import { useEffect, useState } from "react";
import { Subtask, Task } from "../../models/board.model";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  task: Task;
  onSaveTask: (updatedTask: Task) => void;
  onClose: () => void;
}

const EditTaskModal: React.FC<Props> = ({ task, onSaveTask, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState(task.subtasks);

  // Listen for changes in the task prop and update the state
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setSubtasks(task.subtasks);
  }, [task]);

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
  };

  const handleRemoveSubtask = (subtask: Subtask) => {
    const updatedSubtasks = subtasks.filter((item) => item !== subtask);
    setSubtasks(updatedSubtasks);
  };

  const handleAddSubtask = () => {
    const newSubtask: Subtask = {
      id: task.subtasks.length + 1,
      title: "",
      isCompleted: false,
    };
    const updatedSubtasks = [...subtasks, newSubtask];
    setSubtasks(updatedSubtasks);
  };

  const handleSaveTask = () => {
    const updatedTask: Task = {
      ...task,
      title,
      description,
      subtasks,
    };
    onSaveTask(updatedTask);
    onClose();
  };

  return (
    <>
      <div className="flex flex-row w-full justify-between">
        <h3 className="font-bold text-lg text-black">Edit Task</h3>
      </div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="input input-bordered"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="textarea textarea-bordered"
        />
      </div>
      <h3 className="text-lg font-bold mb-2">Subtasks</h3>
      {subtasks.map((subtask, index) => (
        <div key={index} className="form-group">
          <input
            type="text"
            value={subtask.title}
            onChange={(e) => handleSubtaskChange(index, e.target.value)}
            className="input input-bordered"
          />
          <button
            className="btn bg-transparent border-none text-medium_gray hover:text-white hover:bg-primary_btn_hover"
            onClick={() => handleRemoveSubtask(subtask)}
          >
            <CloseIcon />
          </button>
        </div>
      ))}
      <button
        className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white mt-6 h-12 hover:bg-primary_btn_hover"
        onClick={handleAddSubtask}
      >
        <AddIcon />
        Add New Subtask
      </button>
      <div className="modal-actions">
        <button
          className="btn btn-sm lg:btn-md bg-primary_btn_idle border-none plus-jakarta text-white mt-6 h-12 hover:bg-primary_btn_hover"
          onClick={handleSaveTask}
        >
          Save Changes
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditTaskModal;
