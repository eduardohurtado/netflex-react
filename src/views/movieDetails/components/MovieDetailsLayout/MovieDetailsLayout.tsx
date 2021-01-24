// Dependencies
import React, { Suspense } from "react";

// Components
import MovieInfo from "../MovieInfo/MovieInfo";
import Casts from "../Casts/Casts";
import SimilarMovies from "../SimilarMovies/SimilarMovies";

// Shared components
import Loading from "../../../../views/shared/components/Loading/Loading";
import Footer from "../../../../views/shared/components/Footer/Footer";

export default function MovieDetail(): JSX.Element {
  return (
    <div className="container">
      <Suspense fallback={<Loading />}>
        <MovieInfo />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Casts />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <SimilarMovies />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
    </div>
  );
}
