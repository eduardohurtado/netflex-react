// Dependencies
import React, { useState, useEffect, Dispatch } from "react";
import { Link, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

//Global state REDUX
import { connect } from "react-redux";

// Interfaces
interface IProps {
  state: {
    similarMovies: IMovies[] | null;
  };
  fetchSimilarMovieAsync(movie_id: string): void;
}
interface IReduxState {
  similarMovies: IMovies[] | null;
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

function SimilarMovies(props: IProps) {
  const [similarMovie, setSimilarMovie] = useState<IMovies[] | null>();

  const params: { id: string } = useParams();

  useEffect(() => {
    if (params.id) {
      // Call saga to get data to REDUX state
      props.fetchSimilarMovieAsync(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    // Set local state from REDUX state change
    if (props.state.similarMovies) {
      setSimilarMovie(props.state.similarMovies);
    }
  }, [props.state]);

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
    <>
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
  fetchSimilarMovieAsync(movie_id: string) {
    dispatch({
      type: "FETCH_SIMILAR_MOVIE_ASYNC",
      movie_id
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SimilarMovies);
