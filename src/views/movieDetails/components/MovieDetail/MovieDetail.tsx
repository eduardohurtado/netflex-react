// Dependencies
import React, { useState, useEffect, Dispatch } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSimilarMovie } from "../../../../services";
import ReactStars from "react-rating-stars-component";

//Global state REDUX
import { connect } from "react-redux";

// Components
// import Banner from '../Banner/Banner'

// Models
import IMovieDetails from "../../../../models/IMovieDetails";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

// Interfaces
interface IProps {
  state: {
    movieDetails: IMovieDetails | null;
    casts: ICasts[] | null;
  };
  fetchMovieDetailsAsync(movie_id: string): void;
  fetchCastsAsync(movie_id: string): void;
}
interface IReduxState {
  movieDetails: IMovieDetails | null;
  casts: ICasts[] | null;
}
interface IParams {
  id: string;
}
interface IGenres {
  id: number;
  name: string;
}
interface ICasts {
  id: number;
  character: string;
  name: string;
  image: string;
}
interface IMovies {
  id: number[];
  backPoster: string;
  popularity: number;
  title: string;
  poster: string;
  overview: string;
  rating: number;
}

function MovieDetail(props: IProps): JSX.Element {
  const [detail, setDetail] = useState<IMovieDetails | null>();
  const [genresList, setGenresList] = useState<IGenres[]>([]);
  const [casts, setCasts] = useState<ICasts[] | null>();
  const [similarMovie, setSimilarMovie] = useState<IMovies[] | null>();

  const params: IParams = useParams();

  useEffect(() => {
    if (params.id) {
      const fetchAPI = async () => {
        setSimilarMovie(await fetchSimilarMovie(params.id));
      };

      fetchAPI();

      // Call to get data to REDUX state
      props.fetchMovieDetailsAsync(params.id);
      props.fetchCastsAsync(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    // Set local state from REDUX state change
    if (props.state.movieDetails) {
      setDetail(props.state.movieDetails);
    }
    if (props.state.casts) {
      setCasts(props.state.casts);
    }
  }, [props.state]);

  useEffect(() => {
    if (detail?.genres) {
      setGenresList(detail.genres);
    }
  }, [detail]);

  const showGenresList = genresList.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button className="btn btn-outline-info" type="button">
          {item.name}
        </button>
      </li>
    );
  });

  const castsList = casts?.slice(0, 4).map((item, index) => {
    return (
      <div key={index} className="col-md-3 text-center">
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={item.image}
          alt={item.name}
        />
        <p className="font-weight-bold text-center">{item.name} </p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {item.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie?.slice(0, 4).map((item, index) => {
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
    <div className="container">
      {/* <Banner/>  */}

      <div className="container-fluid mt-1">
        <img
          src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`}
          alt={detail?.title}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h2 className="text-center mt-2">{detail?.title}</h2>

      <h4 className="text-center" style={{ color: "#666666" }}>
        {detail?.tagline && <i>{`"${detail?.tagline}"`}</i>}
      </h4>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="list-inline">{showGenresList}</div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail?.vote_average}
              size={20}
              color1={"#f4c10f"}
            ></ReactStars>
          </div>

          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
            <p>{detail?.overview}</p>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>STATUS</p>
          <p style={{ color: "#f4c10f" }}>{detail?.status}</p>
        </div>

        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#f4c10f" }}>{detail?.release_date}</p>
        </div>

        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RUN TIME</p>
          <p style={{ color: "#f4c10f" }}>{detail?.runtime}</p>
        </div>

        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>BUDGET</p>
          <p style={{ color: "#f4c10f" }}>{detail?.budget}</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>

      <div className="row mt-3">{castsList}</div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
            SIMILAR MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">{similarMovieList}</div>
      {!similarMovie && (
        <div style={{ color: "#5a606b" }}>
          Sorry but... there are not similar movies for this one :(
        </div>
      )}

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

const mapStateToProps = (state: IReduxState) => {
  return {
    //Passing the current state of "store.js" because
    state //mapDispatchToProps don't work without
  }; //define mapStateToProps.
};

const mapDispatchToProps = (
  dispatch: Dispatch<{ type: string; movie_id: string }>
) => ({
  fetchMovieDetailsAsync(movie_id: string) {
    dispatch({
      type: "FETCH_MOVIE_DETAILS_ASYNC",
      movie_id
    });
  },

  fetchCastsAsync(movie_id: string) {
    dispatch({
      type: "FETCH_CASTS_ASYNC",
      movie_id
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
