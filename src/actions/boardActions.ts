import { Column } from "../models/board.model";
// 2. Create action with the type "SET_COLUMNS" and data payload
export const setColumns = (data: Column[]) => {
  return {
    type: "SET_COLUMNS",
    payload: data,
  };
};

export const setName = (data: string) => {
  return {
    type: "SET_NAME",
    payload: data,
  };
};
