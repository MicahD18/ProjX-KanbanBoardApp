import { Task } from "../models/board.model";
import TaskCard from "./TaskCard";

interface Props {
  task: Task;
}

const Item: React.FC<Props> = ({ task }) => {
  return (
    <div>
      <TaskCard key={task.id} task={task} />
    </div>
  );
};

export default Item;
