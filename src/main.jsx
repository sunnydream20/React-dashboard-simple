import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// components
import App from "./App";

// styles
import "./index.css";

// provider
import { ThemeProvider } from "./Theme/themeProvider";

// redux
import { store } from "./Redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
