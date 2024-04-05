import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import selectedBoardReducer from "./reducers/boardReducers.ts";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  selectedBoardReducer: selectedBoardReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
