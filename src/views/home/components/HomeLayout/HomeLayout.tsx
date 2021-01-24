// Dependencies
import React, { Suspense } from "react";

// Components
import Carousel from "../Carousel/Carousel";
import MoviesByGenreList from "../MoviesByGenreList/MoviesByGenreList";
import TrendingPerson from "../TrendingPerson/TrendingPerson";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import Footer from "../../../shared/components/Footer/Footer";
import NavBar from "../../../shared/components/NavBar/NavBar";

// Shared components
import Loading from "../../../../views/shared/components/Loading/Loading";

// Styles
import "../../scss/homeLayoutStyle.scss";

export default function HomeLayout(): JSX.Element {
  return (
    <div className="container homeStyles">
      <Suspense fallback={<Loading />}>
        <NavBar />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Carousel />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <MoviesByGenreList />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <TrendingPerson />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <TopRatedMovies />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </div>
  );
}
