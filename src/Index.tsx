// Dependencies
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

//Global state Redux Sagas
import { Provider } from "react-redux";
import reducer from "./store/store";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchAll } from "./store/sagas/root.sagas";

//Middlewares
const sagaMiddleware = createSagaMiddleware();

//Create store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

//Call middlewares
sagaMiddleware.run(watchAll);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.querySelector(".root")
);
