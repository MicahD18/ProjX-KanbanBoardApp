import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardReducers";
import modalReducer from "./reducers/modalReducer";
import sidebarReducer from "./reducers/sidebarReducers";
import authReducer from "./slices/authSlice";
import { thunk } from "redux-thunk";

export const rootReducer = combineReducers({
  boardReducer: boardReducer,
  modalReducer: modalReducer,
  sidebarReducer: sidebarReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
