import React, { Suspense } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

//Components
import Loading from "./tools/components/Loading/Loading";

//Lazy load components
// const AboutPage = React.lazy(() => import("./components/AboutPage"));

//Global styles
import "./scss/normalize.scss";
import "./scss/app.scss";

//Font selector
import "./fonts/fontSelector.scss";

class App extends React.Component {
  render(): JSX.Element {
    return (
      <Router>
        {/* <ReactNotification /> */}
        <div className="gridContainer">
          {/* <NavigationBar /> */}
          <Route
            exact
            path="/"
            render={() => {
              return "Home Page";
            }}
          ></Route>
          <Route
            exact
            path="/Dashboard"
            render={() => {
              return (
                <Suspense fallback={<Loading />}>
                  <div>Dashboard Page</div>
                </Suspense>
              );
            }}
          ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
