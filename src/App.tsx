// Dependencies
import React, { Suspense } from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// Tools
import Loading from "./views/shared/components/Loading/Loading";

// Components
import HomeLayout from "./views/home/components/HomeLayout/HomeLayout";
import IndexLayout from "./views/index/components/IndexLayout/IndexLayout";

// Lazy loaded components
const MovieDetailsLayout = React.lazy(
  () =>
    import(
      "./views/movieDetails/components/MovieDetailsLayout/MovieDetailsLayout"
    )
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
              return <IndexLayout />;
            }}
          ></Route>

          <Route
            exact
            path="/Home"
            render={() => {
              return (
                <Suspense fallback={<Loading />}>
                  <HomeLayout />
                </Suspense>
              );
            }}
          ></Route>

          <Route
            exact
            path="/MovieDetails/:id"
            render={() => {
              return (
                <Suspense fallback={<Loading />}>
                  <MovieDetailsLayout />
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
