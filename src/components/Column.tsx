import { Task } from "../models/board.model";

interface Props {
  tasks: Task[];
}

const Column: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="flex flex-col gap-4 py-6 px-3 rounded-md mt-12 mb-12 bg-off_gray">
      {tasks.map((task: Task) => (
        <div className="card w-full bg-white shadow-md" key={task.id}>
          <div className="card-body">
            <p className="card-title text-black text-sm">{task.title}</p>
            <p>{task.subtasks.length} subtasks</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Column;
