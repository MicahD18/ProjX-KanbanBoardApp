import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardSlice from "./slices/boardSlice";
import boardReducer from "./reducers/boardReducers";
import modalReducer from "./reducers/modalReducer";

const rootReducer = combineReducers({
  board: boardSlice,
  boardReducer: boardReducer,
  modalReducer: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
