import { Column, Task } from "../models/board.model";

export const UPDATE_TASK = "UPDATE_TASK";
export const SET_SELECTED_TASK = "SET_SELECTED_TASK";
export const SET_COLUMNS = "SET_COLUMNS";
export const SET_NAME = "SET_NAME";

// 2. Create action with the type "SET_COLUMNS" and data payload
export const setColumns = (columns: Column[]) => {
  return {
    type: SET_COLUMNS,
    payload: columns,
  };
};

export const setName = (name: string) => {
  return {
    type: SET_NAME,
    payload: name,
  };
};

export const updateTask = (updatedTask: Task) => {
  return {
    type: UPDATE_TASK,
    payload: updatedTask,
  };
};

export const setSelectedTask = (task: Task | null) => ({
  type: SET_SELECTED_TASK,
  payload: task,
});
