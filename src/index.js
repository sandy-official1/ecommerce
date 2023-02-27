import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from ".././src/Components/store/Authcontext";

ReactDOM.render(
  <AuthContextProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </AuthContextProvider>,
  document.getElementById("root")
);
