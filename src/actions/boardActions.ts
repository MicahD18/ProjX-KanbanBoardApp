import { Column } from "../models/board.model";
// 2. Create action with the type "SET_BOARD_SELECTED" and data payload
export const setSelectedBoard = (data: Column[]) => ({
  type: "SET_SELECTED_BOARD",
  payload: data,
});
