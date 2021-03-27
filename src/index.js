import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./features/store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
