// Dependencies
import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

// Models
import IGenres from "../../../../models/IGenres";
import IMovies from "../../../../models/IMovies";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

// Styles
import "./moviesByGenreList.scss";
const navigationIcon: React.CSSProperties = {
  color: "#f4c10f",
  fontSize: 30,
  fontWeight: "bolder",
  cursor: "pointer"
};

// Services
import {
  fetchGenre,
  fetchMovieByGenre,
  fetchMovies
} from "../../../../services";

export default function MoviesByGenreList(): JSX.Element {
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setGenres(((await fetchGenre()) as unknown) as []);
      setMovieByGenre(((await fetchMovieByGenre(28)) as unknown) as []);
      setNowPlaying(((await fetchMovies()) as unknown) as []);
    };

    fetchAPI();

    // Esto es lo que he intentado *****

    // Toggle button "active" class on press
    // const element = document.getElementById("genresButton");
    // // or whatever triggers the toggle
    // const trigger = document.getElementById("js-toggle-sidebar");

    // if (element) {
    //   element.addEventListener("click", (e) => {
    //     const element = (e as unknown) as HTMLElement;
    //     element.classList.add("active");
    //   });
    // }
  }, []);

  const handleGenreClick = async (genre_id: number) => {
    setMovieByGenre(((await fetchMovieByGenre(genre_id)) as unknown) as []);
  };

  const genreList = genres.map((item: IGenres, index: number) => {
    return (
      <li key={index} className="list-inline-item">
        <button
          className="btn btn-outline-info"
          id="genresButton"
          type="button"
          onClick={() => {
            handleGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });

  const movieListByGenre = movieByGenre
    .slice(0, 8)
    .map((item: IMovies, index) => {
      return (
        <div className="col-md-3" key={index}>
          <div className="card">
            <Link to={`/MovieDetails/${item.id}`}>
              <img className="img-fluid" src={item.poster} alt={item.title} />
            </Link>
          </div>
          <div className="mt-3">
            <p style={{ fontWeight: "bolder" }}>{item.title} </p>
            <p>Rated: {item.rating} </p>
            <ReactStars
              count={item.rating}
              size={20}
              color1={"#f4c10f"}
            ></ReactStars>
          </div>
        </div>
      );
    });

  const movieList = nowPlaying.slice(0, 8).map((item: IMovies, index) => {
    return (
      <div className="col-md-3" key={index}>
        <div className="card">
          <Link to={`/MovieDetails/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title} />
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title} </p>
          <p>Rated: {item.rating} </p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="float-right">
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              style={navigationIcon}
            />
          </div>
        </div>
      </div>

      {/* <div className="row mt-3">{movieListByGenre}</div> */}

      <div className="row mt-3">{movieList}</div>
    </>
  );
}
