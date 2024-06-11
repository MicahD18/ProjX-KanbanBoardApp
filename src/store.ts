import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardReducers";
import modalReducer from "./reducers/modalReducer";
import sidebarReducer from "./reducers/sidebarReducers";

export const rootReducer = combineReducers({
  boardReducer: boardReducer,
  modalReducer: modalReducer,
  sidebarReducer: sidebarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
