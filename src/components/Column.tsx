import { Task } from "../models/board.model";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  id: string;
  tasks: Task[];
}

const Column: React.FC<Props> = ({ id, tasks }) => {
  // const { setNodeRef } = useDroppable({
  //   id,
  // });

  return (
    <></>
    // <SortableContext
    //   id={id}
    //   items={tasks.map((i) => i.id)}
    //   // strategy={verticalListSortingStrategy}
    // >
    // <div
    //   // ref={setNodeRef}
    //   className="flex flex-col gap-4 py-6 px-3 rounded-md mt-12 mb-12 bg-off_gray"
    // >
    //   {tasks.map((task: Task) => (
    //     <TaskCard key={task.id} task={task} />
    //   ))}
    // </div>
    // </SortableContext>
  );
};

export default Column;
