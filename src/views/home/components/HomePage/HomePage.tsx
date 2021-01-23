// Dependencies
import React, { useState, useEffect } from "react";
import RBCarousel from "react-bootstrap-carousel";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

// Services
import {
  fetchGenre,
  fetchMovies,
  fetchMovieByGenre,
  fetchPersons,
  fetchTopRatedMovie
} from "../../../../services";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faArrowAltCircleRight
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

// Styles
import "./homePage.scss";

interface IMovies {
  id: number[];
  backPoster: string;
  popularity: number;
  title: string;
  poster: string;
  overview: string;
  rating: number;
}

interface IGenres {
  id: number;
  name: string;
}

interface IPersons {
  id: number;
  popularity: number;
  name: string;
  profileImg: string;
  known: string;
}

const navigationIcon: React.CSSProperties = {
  color: "#f4c10f",
  fontSize: 30,
  fontWeight: "bolder",
  cursor: "pointer"
};

export default function HomePage(): JSX.Element {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(((await fetchMovies()) as unknown) as []);
      setGenres(((await fetchGenre()) as unknown) as []);
      // Modify the number of fetchMovieByGenre !!!
      setMovieByGenre(((await fetchMovieByGenre(28)) as unknown) as []);
      setPersons(((await fetchPersons()) as unknown) as []);
      setTopRated(((await fetchTopRatedMovie()) as unknown) as []);
    };

    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_id: number) => {
    setMovieByGenre(((await fetchMovieByGenre(genre_id)) as unknown) as []);
  };

  const movies = nowPlaying.slice(0, 8).map((item: IMovies, index: number) => {
    return (
      <div key={index}>
        <div className="carousel-center mt-1">
          <img
            src={item.backPoster}
            alt={item.title}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="carousel-caption">{item.title}</div>
      </div>
    );
  });

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

  const trendingPersons = persons
    .slice(0, 4)
    .map((item: IPersons, index: number) => {
      return (
        <div key={index} className="col-md-3 text-center">
          <img
            className="img-fluid rounded-circle mx-auto d-block"
            src={item.profileImg}
            alt={item.name}
          />
          <p className="font-weight-bold text-center">{item.name} </p>
          <p
            className="font-weight-light text-center"
            style={{ color: "#5a606b" }}
          >
            Trending for: {item.known}{" "}
          </p>
        </div>
      );
    });

  const topRatedList = topRated.slice(0, 4).map((item: IMovies, index) => {
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
    <div className="container">
      <div className="row">
        <div className="col">
          <RBCarousel
            autoplay={true}
            pauseOnVisibility={true}
            slidesShowSpeed={500}
            version={4}
          >
            {movies}
          </RBCarousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>

      <div className="row mt-3">
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

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TRENDING PERSON ON THIS WEEK
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              style={navigationIcon}
            />
          </div>
        </div>
      </div>

      <div className="row mt-3">{trendingPersons}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TOP RATED MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">
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

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />

      <div className="row mt-3">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3 className="font-weight-bold">ABOUT ME</h3>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
            doloremque at repudiandae inventore iusto quis, maiores provident?
            Ipsa, iusto rem modi aut tempore officiis facere. Ea eos nemo harum
            dicta?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi
            fugit aliquam nostrum libero, deleniti voluptate fuga? Fugit
            inventore voluptatibus, eos animi a beatae possimus autem neque
            ipsum similique praesentium?
          </p>

          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>KEEP IN TOUCH</h3>

          <ul className="list-unstyled">
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <strong>&nbsp;Address:</strong> city, state, country
            </li>
            <li>
              <FontAwesomeIcon icon={faPhoneAlt} />
              <strong>&nbsp;Phone:</strong> +57 311 234 1234
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <strong>&nbsp;Email:</strong> lehurtadog@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div style={{ height: 50 }}></div>
    </div>
  );
}
