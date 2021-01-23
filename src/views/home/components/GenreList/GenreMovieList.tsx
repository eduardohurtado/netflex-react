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
import "./genreMovieList.scss";
const navigationIcon: React.CSSProperties = {
  color: "#f4c10f",
  fontSize: 30,
  fontWeight: "bolder",
  cursor: "pointer"
};

import { fetchGenre, fetchMovieByGenre } from "../../../../services";

export default function GenreMovieList(): JSX.Element {
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setGenres(((await fetchGenre()) as unknown) as []);
      setMovieByGenre(((await fetchMovieByGenre(28)) as unknown) as []);
    };

    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_id: number) => {
    setMovieByGenre(((await fetchMovieByGenre(genre_id)) as unknown) as []);
  };

  const genreList = genres.map((item: IGenres, index: number) => {
    return (
      <li key={index} className="list-inline-item">
        <button
          className="btn btn-outline-info"
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

  const movieList = movieByGenre.slice(0, 8).map((item: IMovies, index) => {
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

      <div className="row mt-3">{movieList}</div>
    </>
  );
}
