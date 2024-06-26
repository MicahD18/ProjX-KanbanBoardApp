import { Board, Column, Task } from "../models/board.model";

export const UPDATE_TASK = "UPDATE_TASK";
export const SET_SELECTED_TASK = "SET_SELECTED_TASK";
export const SET_COLUMNS = "SET_COLUMNS";
export const SET_NAME = "SET_NAME";
export const SET_BOARD = "SET_BOARD";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const SET_BOARDS = "SET_BOARDS";
export const SET_BOARD_NAME = "SET_BOARD_NAME";

// 2. Create action with the type "SET_COLUMNS" and data payload
export const setColumns = (columns: Column[] | null) => {
  return {
    type: SET_COLUMNS,
    payload: columns,
  };
};

export const setBoard = (selectedBoard: Board | null) => {
  return {
    type: SET_BOARD,
    payload: selectedBoard,
  };
};

export const setBoards = (boards: Board[]) => {
  return {
    type: SET_BOARDS,
    payload: boards,
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

export const setBoardName = (name: string) => ({
  type: SET_BOARD_NAME,
  payload: name,
});
