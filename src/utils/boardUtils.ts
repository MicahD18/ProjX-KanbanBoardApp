/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import { Board } from "../models/board.model";
import { setBoard, setBoards } from "../actions/boardActions";
import { saveToLocalStorage } from "./localStorage";

export const updateBoardWithColumns = (
  dispatch: Dispatch<any>,
  boards: Board[],
  selectedBoard: Board | null,
  updatedColumns: Board["columns"]
) => {
  if (selectedBoard) {
    // create a copy of boards to avoid state mutation
    const boardsCopy = [...boards];
    const updatedBoard: Board = {
      ...selectedBoard,
      columns: updatedColumns,
    };
    dispatch(setBoard(updatedBoard));
    // update the boards array with the updatedBoard
    const boardIndex = boardsCopy.findIndex(
      (board) => board.id === updatedBoard.id
    );
    // Replace old board with the new board
    const updatedBoards = [
      ...boardsCopy.slice(0, boardIndex),
      updatedBoard,
      ...boardsCopy.slice(boardIndex + 1),
    ];
    // call the setBoards action to set the global state of the boards
    dispatch(setBoards(updatedBoards));
    // save the updated boards array to local storage
    saveToLocalStorage("boards", updatedBoards);
  }
};
