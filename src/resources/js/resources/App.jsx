import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "../state/store";
import ErrorBoundary from "./components/Error/ErrorBoundry";
import { AppRoutes } from "./navigation";

const serverConfig = require("../../../server-config.json");

function App() {
  const { environment } = serverConfig;

  return (
    <Provider store={store}>
      {environment === "local" && <AppRoutes />}
      {environment !== "local" && (
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      )}
    </Provider>
  );
}

export default App;

if (document.getElementById("root")) {
  createRoot(document.getElementById("root")).render(<App />);
}
