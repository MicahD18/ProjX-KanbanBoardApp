import { Task } from "../models/board.model";

interface Props {
  tasks: Task[];
}

const Column: React.FC<Props> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task: Task) => (
        <div key={task.id}>
          <p>{task.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Column;
