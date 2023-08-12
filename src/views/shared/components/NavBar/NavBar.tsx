import React, { useState } from "react";
import { Link } from "react-router-dom";
import IMovies from "models/IMovies.model";
import { fetchMovieByKeyword } from "services";

export default function NavBar(): JSX.Element {
  const [searchResult, setSearchResult] = useState<IMovies[] | null>([]);

  const getMovieByKeyword = async (keyword: string) => {
    setSearchResult(await fetchMovieByKeyword(keyword));
  };

  const movieListByGenre = searchResult
    ? searchResult.slice(0, 8).map((item: IMovies, index) => {
        return (
          <div
            key={index}
            style={{
              float: "right",
              background: "#EEEEEE"
            }}
          >
            <div className="">
              <Link to={`/MovieDetails/${item.id}`}>
                <img
                  style={{ height: 80, width: "auto" }}
                  src={item.poster}
                  alt={item.title}
                />
              </Link>
            </div>
            <div
              className=""
              style={{ fontWeight: "bolder", color: "#333333" }}
            >
              <p>{item.title}</p>
              <p>Rated: {item.rating} </p>
            </div>
          </div>
        );
      })
    : [];

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "#30475e" }}
      >
        <a className="navbar-brand" style={{ color: "#eeeeee" }}>
          NetFlex
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/">
                <a className="nav-link" style={{ color: "#eeeeee" }}>
                  Home <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/movies">
                <a className="nav-link" style={{ color: "#eeeeee" }}>
                  Movies <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              onChange={(obj) => {
                getMovieByKeyword(obj.target.value);
              }}
            />
          </form>
        </div>
      </nav>

      {movieListByGenre}
    </div>
  );
}
