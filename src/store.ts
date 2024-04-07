import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardReducers";

const rootReducer = combineReducers({
  boardReducer: boardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
