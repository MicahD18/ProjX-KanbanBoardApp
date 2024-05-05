# ProjX

A web application I built using React where you create your own kanban boards. Add containers to your board to keep track of your tasks. Create tasks and drag & drop them anywhere on your board.

## Installation

##### 1. 'npm install' to install the dependencies
##### 2. 'npm run dev' to run local dev server

## What I Learned

#### 1. Redux (for global state management)

Handles:
  - boards data
  - modals
  - sidebar

#### 2. Implementing 'Drag & Drop' algorithm using dnd-kit library

#### 3. CRUD operations for:
  - boards
  - columns
  - tasks

#### 4. Utilizing localStorage (for data integrity)

## Design

##### Design credit goes to: https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB (used for reference)

## Process

### Using Redux

##### I began with creating a reducer and actions for handling the data:
##### Actions:
```typescript
import { Board, Column, Task } from "../models/board.model";

export const UPDATE_TASK = "UPDATE_TASK";
export const SET_SELECTED_TASK = "SET_SELECTED_TASK";
export const SET_COLUMNS = "SET_COLUMNS";
export const SET_NAME = "SET_NAME";
export const SET_BOARD = "SET_BOARD";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const SET_BOARDS = "SET_BOARDS";

// 2. Create action with the type "SET_COLUMNS" and data payload
export const setColumns = (columns: Column[] | null) => {
  return {
    type: SET_COLUMNS,
    payload: columns,
  };
};

export const setBoard = (board: Board | null) => {
  return {
    type: SET_BOARD,
    payload: board,
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
```
##### Reducer:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from "@reduxjs/toolkit";
import { Board, Column, Task } from "../models/board.model";
import {
  UPDATE_TASK,
  SET_SELECTED_TASK,
  SET_COLUMNS,
  SET_BOARD,
  SET_BOARDS,
} from "../actions/boardActions";
import { loadFromLocalStorage } from "../utils/localStorage";

// Before implementing localStorage:
// const boardsData = [...boards];

// Load boards from localStorage
const boardsData = loadFromLocalStorage("boards") || [];

// FOR TESTING:
// localStorage.removeItem("boards");

interface State {
  selectedBoard: Board | null;
  boards: Board[] | null;
  columns: Column[] | null;
  selectedTask: Task | null;
}

// set the inital state
const initialState: State = {
  selectedBoard: null,
  boards: boardsData,
  columns: null,
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
    case SET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case SET_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case UPDATE_TASK:
      // eslint-disable-next-line no-case-declarations
      const updatedTask: Task = action.payload;
      // Create a copy of columns array
      // eslint-disable-next-line no-case-declarations
      const newColumns =
        state.columns?.map((column) => {
          // find the index of the updated task
          const taskIndex = column.tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          // if an index is found, remove the old task and replace it with the updated one
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
          // else return column
          return column;
        }) || []; // if no columns, return an empty array
      return { ...state, columns: newColumns, selectedTask: updatedTask };
    case SET_SELECTED_TASK:
      return { ...state, selectedTask: action.payload };
    default:
      return state;
  }
}
```
