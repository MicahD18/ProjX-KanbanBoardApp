import { UniqueIdentifier } from "@dnd-kit/core";

export interface Subtask {
  id: UniqueIdentifier;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: UniqueIdentifier;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

export interface Column {
  id: UniqueIdentifier;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: UniqueIdentifier;
  name: string;
  columns: Column[];
}

export interface Data {
  boards: Board[];
}
