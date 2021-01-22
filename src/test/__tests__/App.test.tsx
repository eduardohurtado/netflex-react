import React from "react";
import ReactDOM from "react-dom";

//Test target
import App from "../../App";

//Global Redux state
import reducer from "../../store/store";
import { Provider } from "react-redux";
import { createStore } from "redux";
const store = createStore(reducer);

//Mocks

//Unit test ----->

//Integration test ----->
test("App render", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
