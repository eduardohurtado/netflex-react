// Dependencies
import React, { Suspense } from "react";

// Components
import Carousel from "../Carousel/Carousel";
import GenreMovieList from "../GenreList/GenreMovieList";
import TrendingPerson from "../TrendingPerson/TrendingPerson";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import Footer from "../../../shared/components/Footer/Footer";

// Shared components
import Loading from "../../../../views/shared/components/Loading/Loading";

// Styles
import "../../scss/homeLayoutStyle.scss";

export default function HomeLayout(): JSX.Element {
  return (
    <div className="container homeStyles">
      <Suspense fallback={<Loading />}>
        <Carousel />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <GenreMovieList />
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
