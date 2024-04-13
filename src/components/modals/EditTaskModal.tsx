import { useState } from "react";
import { Task } from "../../models/board.model";

interface Props {
  task: Task;
  onSaveTask: (updatedTask: Task) => void;
  onClose: () => void;
}

const EditTaskModal: React.FC<Props> = ({ task, onSaveTask, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [subtasks, setSubtasks] = useState(task.subtasks);

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
    console.log(updatedSubtasks);
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
        </div>
      ))}
      <div className="modal-actions">
        <button className="btn btn-primary" onClick={handleSaveTask}>
          Save
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default EditTaskModal;
