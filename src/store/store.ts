// Models
import IMovieDetails from "../models/IMovieDetails";

// Interfaces
interface IAction {
  type: string;
  data: IMovieDetails;
  castsData: ICasts[];
  similarMoviesData: IMovies[];
  payload: [];
}
interface IAppState {
  movieDetails: IMovieDetails | null;
  casts: ICasts[] | null;
  similarMovies: IMovies[] | null;
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

//APP default initial state
const appState: IAppState = {
  movieDetails: null,
  casts: null,
  similarMovies: null
};

const reducer = (state = appState, action: IAction): IAppState => {
  if (action.type === "MOVIE_DETAILS_ASYNC") {
    return {
      ...state,
      movieDetails: action.data
    };
  } else if (action.type === "CASTS_ASYNC") {
    return {
      ...state,
      casts: action.castsData
    };
  } else if (action.type === "SIMILAR_MOVIE_ASYNC") {
    return {
      ...state,
      similarMovies: action.similarMoviesData
    };
  }

  return state;
};

export default reducer;
