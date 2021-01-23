// Dependencies
import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

// Services
import { fetchTopRatedMovie } from "../../../../services";

// Models
import IMovies from "../../../../models/IMovies";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

// Styles
const navigationIcon: React.CSSProperties = {
  color: "#f4c10f",
  fontSize: 30,
  fontWeight: "bolder",
  cursor: "pointer"
};

export default function TopRatedMovies(): JSX.Element {
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setTopRated(((await fetchTopRatedMovie()) as unknown) as []);
    };

    fetchAPI();
  }, []);

  const topRatedList = topRated
    .slice(0, 4)
    .map((item: IMovies, index: number) => {
      return (
        <div key={index} className="col-md-3">
          <div className="card">
            <Link to={`/MovieDetails/${item.id}`}>
              <img src={item.poster} alt={item.title} className="img-fluid" />
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
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TOP RATED MOVIES
          </p>
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

      <div className="row mt-3">{topRatedList}</div>
    </>
  );
}
