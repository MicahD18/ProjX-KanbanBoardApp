import { PayloadAction } from "@reduxjs/toolkit";
import { Column } from "../models/board.model";

interface State {
  columns: Column[] | null;
  name: string | null;
}

const initialState: State = {
  columns: null,
  name: null,
};
// 3. Reducer handles the "SET_SELECTED_BOARD" action, by updating the state.data
// with the new action.payload
export default function boardReducer(
  state = initialState,
  action: PayloadAction<Column[] | string>
) {
  switch (action.type) {
    case "SET_COLUMNS":
      return {
        ...state,
        columns: action.payload,
      };
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}
