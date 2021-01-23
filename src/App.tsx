// Dependencies
import React, { Suspense } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// Tools
import Loading from "./tools/components/Loading/Loading";

// Components
import HomePage from "./views/home/components/HomePage/HomePage";

// Lazy loaded components
const MovieDetail = React.lazy(
  () => import("./views/home/components/MovieDetail/MovieDetail")
);

// Global styles
import "./scss/normalize.scss";
import "./scss/app.scss";

// Font selector
import "./fonts/fontSelector.scss";

class App extends React.Component {
  render(): JSX.Element {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => {
              return <HomePage />;
            }}
          ></Route>

          <Route
            exact
            path="/MovieDetails/:id"
            render={() => {
              return (
                <Suspense fallback={<Loading />}>
                  <MovieDetail />
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
