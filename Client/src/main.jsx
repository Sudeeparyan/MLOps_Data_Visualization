/**
 * React Application Entry Point
 *
 * This file is the entry point of the React application. It renders the main App component wrapped inside a Redux Provider
 * and mounts it to the root element of the HTML document.
 */

import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import "./Styles/style.css";
import { store } from "./Redux/store.jsx";
import App from "./Pages/App/app";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
