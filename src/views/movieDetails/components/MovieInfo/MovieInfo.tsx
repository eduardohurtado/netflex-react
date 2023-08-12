// Dependencies
import React, { useState, useEffect, Dispatch } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

//Global state REDUX
import { connect } from "react-redux";

// Models
import IMovieDetails from "models/IMovieDetails.model";

// Interfaces
interface IProps {
  state: {
    movieDetails: IMovieDetails | null;
  };
  fetchMovieDetailsAsync(movie_id: string): void;
}
interface IReduxState {
  movieDetails: IMovieDetails | null;
}
interface IParams {
  id: string;
}
interface IGenres {
  id: number;
  name: string;
}

function MovieInfo(props: IProps): JSX.Element {
  const [detail, setDetail] = useState<IMovieDetails | null>();
  const [genresList, setGenresList] = useState<IGenres[]>([]);

  const params: IParams = useParams();

  useEffect(() => {
    if (params.id) {
      // Call saga to get data to REDUX state
      props.fetchMovieDetailsAsync(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    // Set local state from REDUX state change
    if (props.state.movieDetails) {
      setDetail(props.state.movieDetails);
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

  return (
    <>
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
    </>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
