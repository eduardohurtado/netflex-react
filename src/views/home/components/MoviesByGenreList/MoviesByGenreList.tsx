// Dependencies
import React, { useState, useEffect, useRef } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

// Models
import IGenres from "models/IGenres.model";
import IMovies from "models/IMovies.model";

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
import { fetchGenre, fetchMovieByGenre, fetchMovies } from "services";

export default function MoviesByGenreList(): JSX.Element {
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [, setNowPlaying] = useState([]);
  const [activeButtons, setActiveButtons] = useState(new Set<number>());

  const buttons = useRef([] as Array<HTMLElement | null>);

  useEffect(() => {
    const fetchAPI = async () => {
      setGenres((await fetchGenre()) as unknown as []);
      setMovieByGenre((await fetchMovieByGenre("28")) as unknown as []);
      setNowPlaying((await fetchMovies()) as unknown as []);
    };

    fetchAPI();
  }, []);

  const getFetchString = (): string => {
    const myArr = Array.from(activeButtons);

    const fetchGendersString = myArr.reduce((acc, curr) => {
      acc += `${curr.toString()},`;

      return acc;
    }, "");

    return fetchGendersString;
  };

  const handleGenreClick = async (genre_id: number, index: number) => {
    const isActive = activeButtons.has(genre_id);
    if (isActive) {
      activeButtons.delete(genre_id);
      buttons.current[index]?.classList.remove("active");
    } else {
      activeButtons.add(genre_id);
      buttons.current[index]?.classList.add("active");
    }

    setActiveButtons(activeButtons);

    setMovieByGenre(
      (await fetchMovieByGenre(getFetchString())) as unknown as []
    );
  };

  const genreList = genres.map((item: IGenres, index: number) => {
    return (
      <li key={index} className="list-inline-item">
        <button
          className="btn btn-outline-info"
          id={index.toString()}
          type="button"
          onClick={() => {
            handleGenreClick(item.id, index);
          }}
          ref={(element) => buttons.current.push(element)}
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

      {movieListByGenre.length > 0 && (
        <div className="row mt-3">{movieListByGenre}</div>
      )}

      {movieListByGenre.length === 0 && (
        <div
          className="text-center"
          style={{ color: "#999999", marginBottom: 10 }}
        >
          {
            "Sorry but we cannot find any movie to match with the current genders selected :("
          }
        </div>
      )}
    </>
  );
}
