// Dependencies
import { takeLatest, all, put } from "redux-saga/effects";
import axios from "axios";

// Interfaces
interface IAction {
  type: string;
  movie_id: string;
}
interface ICastsFromServer {
  id: number;
  character: string;
  name: string;
  profile_path: string;
}
interface ICasts {
  id: number;
  character: string;
  name: string;
  image: string;
}
interface ISimilarFromServer {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
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
interface IMoviesFromServer {
  id: number[];
  backdrop_path: string;
  popularity: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

// API connection
const apiKey = "98179848b35435b028ff7dc5f9d382d7";
const URI = "https://api.themoviedb.org/3";
const movieUrl = `${URI}/movie`;

// SAGA
function* fetchMovieDetailsAsync(action: IAction) {
  try {
    const { data } = yield axios.get(`${movieUrl}/${action.movie_id}`, {
      params: {
        api_key: apiKey,
        language: "en-US"
      }
    });

    yield put({ type: "MOVIE_DETAILS_ASYNC", data });
  } catch (error) {
    console.error("Error on 'fetchMovieDetailsAsync':", error);
  }
}

// SAGA
function* fetchCastsAsync(action: IAction) {
  try {
    const { data } = yield axios.get(`${movieUrl}/${action.movie_id}/credits`, {
      params: {
        api_key: apiKey,
        language: "en-US"
      }
    });

    const castsData: ICasts[] = yield data["cast"].map(
      (c: ICastsFromServer) => ({
        id: c["id"],
        character: c["character"],
        name: c["name"],
        image: "https://image.tmdb.org/t/p/w200/" + c["profile_path"]
      })
    );

    yield put({ type: "CASTS_ASYNC", castsData });
  } catch (error) {
    console.error("Error on 'fetchCastsAsync':", error);
  }
}

// SAGA
function* fetchSimilarMovieAsync(action: IAction) {
  try {
    const { data } = yield axios.get(`${movieUrl}/${action.movie_id}/similar`, {
      params: {
        api_key: apiKey,
        language: "en-US"
      }
    });

    const dataTyped = data as ISimilarFromServer;

    const posterUrl = "https://image.tmdb.org/t/p/original/";

    if (dataTyped.results.length > 0) {
      const similarMoviesData: IMovies[] = yield data["results"].map(
        (m: IMoviesFromServer) => ({
          id: m["id"],
          backPoster: posterUrl + m["backdrop_path"],
          popularity: m["popularity"],
          title: m["title"],
          poster: posterUrl + m["poster_path"],
          overview: m["overview"],
          rating: m["vote_average"]
        })
      );

      yield put({ type: "SIMILAR_MOVIE_ASYNC", similarMoviesData });
    } else {
      console.log("Something went wrong on 'fetchSimilarMovieAsync' :(");
    }
  } catch (error) {
    console.error("Error on 'fetchSimilarMovieAsync':", error);
  }
}

// Watch ALL Redux Saga Middleware
export function* watchAll(): Generator<unknown> {
  yield all([
    takeLatest("FETCH_MOVIE_DETAILS_ASYNC", fetchMovieDetailsAsync),
    takeLatest("FETCH_CASTS_ASYNC", fetchCastsAsync),
    takeLatest("FETCH_SIMILAR_MOVIE_ASYNC", fetchSimilarMovieAsync)
  ]);
}
