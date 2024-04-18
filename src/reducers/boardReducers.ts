/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from "@reduxjs/toolkit";
import { Board, Column, Task } from "../models/board.model";
import {
  UPDATE_TASK,
  SET_SELECTED_TASK,
  SET_COLUMNS,
  SET_NAME,
  SET_BOARD,
} from "../actions/boardActions";

interface State {
  board: Board | null;
  columns: Column[] | null;
  name: string | null;
  selectedTask: Task | null;
}

const initialState: State = {
  board: null,
  columns: null,
  name: null,
  selectedTask: null,
};
// 3. Reducer handles the "SET_SELECTED_BOARD" action, by updating the state.data
// with the new action.payload
export default function boardReducer(
  state = initialState,
  action: PayloadAction<any>
) {
  switch (action.type) {
    case SET_COLUMNS:
      return {
        ...state,
        columns: action.payload,
      };
    case SET_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case UPDATE_TASK:
      // eslint-disable-next-line no-case-declarations
      const updatedTask = action.payload;
      // eslint-disable-next-line no-case-declarations
      const newColumns =
        state.columns?.map((column) => {
          const taskIndex = column.tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          if (taskIndex !== -1) {
            return {
              ...column,
              tasks: [
                ...column.tasks.slice(0, taskIndex),
                updatedTask,
                ...column.tasks.slice(taskIndex + 1),
              ],
            };
          }
          return column;
        }) || [];
      return { ...state, columns: newColumns, selectedTask: updatedTask };
    case SET_SELECTED_TASK:
      return { ...state, selectedTask: action.payload };
    default:
      return state;
  }
}
