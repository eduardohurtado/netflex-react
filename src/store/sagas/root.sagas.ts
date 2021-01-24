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

// API connection
const apiKey = "98179848b35435b028ff7dc5f9d382d7";
const URI = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${URI}/movie/now_playing`;
const topRatedUrl = `${URI}/movie/top_rated`;
const movieUrl = `${URI}/movie`;
const genereUrl = `${URI}/genre/movie/list`;
const moviesUrl = `${URI}/discover/movie`;
const personUrl = `${URI}/trending/person/week`;

// SAGA
function* fetchMovieDetailsAsync(action: IAction) {
  try {
    // Cannot change "data" name!!!
    const { data } = yield axios.get(`${movieUrl}/${action.movie_id}`, {
      params: {
        api_key: apiKey,
        language: "en-US"
      }
    });

    yield put({ type: "MOVIE_DETAILS_ASYNC", data });
  } catch (error) {
    console.error("Error on 'fetchMovieDetailsAsync'", error);
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
    console.error(`Error on "fetchCastsAsync"`, error);
  }
}

// Watch ALL Redux Saga Middleware
export function* watchAll(): Generator<unknown> {
  yield all([
    takeLatest("FETCH_MOVIE_DETAILS_ASYNC", fetchMovieDetailsAsync),
    takeLatest("FETCH_CASTS_ASYNC", fetchCastsAsync)
  ]);
}
