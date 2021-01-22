import React from "react";
import ReactDOM from "react-dom";

//Test target
import Task from "../../components/Task";

//Global Redux state
import reducer from "../../store/store";
import { Provider } from "react-redux";
import { createStore } from "redux";
const store = createStore(reducer);

//Mocks
import { propTask } from "../__mocks__/functionMock";

//Unit test ----->

//Integration test ----->
test("Task render", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Task propTask={propTask} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
