// Dependencies
import React from "react";

// components
import Carousel from "../Carousel/Carousel";
import GenreMovieList from "../GenreList/GenreMovieList";
import TrendingPerson from "../TrendingPerson/TrendingPerson";
import TopRatedMovies from "../TopRatedMovies/TopRatedMovies";
import Footer from "../Footer/Footer";

// Styles
import "../../scss/homeLayoutStyle.scss";

export default function HomeLayout(): JSX.Element {
  return (
    <div className="container homeStyles">
      <Carousel />

      <GenreMovieList />

      <TrendingPerson />

      <TopRatedMovies />

      <Footer />
    </div>
  );
}
