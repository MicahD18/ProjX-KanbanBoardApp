import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardSlice from "./slices/boardSlice";

const rootReducer = combineReducers({
  board: boardSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
