import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, Column } from "../models/board.model";

interface BoardState {
  columns: Column[];
  name: string;
  selectedTask: Task | null;
}

const initialState: BoardState = {
  columns: [],
  name: "",
  selectedTask: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;
      const column = state.columns.find((col) =>
        col.tasks.some((task) => task.id === updatedTask.id)
      );
      if (column) {
        const taskIndex = column.tasks.findIndex(
          (task) => task.id === updatedTask.id
        );
        column.tasks[taskIndex] = updatedTask;
      }
      state.selectedTask = updatedTask;
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { updateTask, setSelectedTask, setColumns, setName } =
  boardSlice.actions;
export default boardSlice.reducer;
