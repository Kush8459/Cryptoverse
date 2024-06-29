import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "./app/store.js";

import App from "./App.js";
import "antd/dist/reset.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
