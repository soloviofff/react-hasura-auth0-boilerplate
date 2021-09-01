import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import AuthProvider from './auth/AuthProvider'
import ApolloProvider from './auth/ApolloProvider'

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </AuthProvider>
  ,
  document.getElementById("root")
);

serviceWorker.unregister();
