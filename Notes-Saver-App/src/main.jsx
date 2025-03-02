import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { Store } from "./store/Store";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <App />
    <Toaster />
  </Provider>
);
