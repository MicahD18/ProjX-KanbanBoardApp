import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardReducers";
import modalReducer from "./reducers/modalReducer";

const rootReducer = combineReducers({
  boardReducer: boardReducer,
  modalReducer: modalReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
