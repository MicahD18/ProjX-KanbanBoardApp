import { combineReducers, configureStore } from "@reduxjs/toolkit";
import columnsReducer from "./reducers/boardReducers";

const rootReducer = combineReducers({
  columnsReducer: columnsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
