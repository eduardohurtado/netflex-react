import { IAppState, IAction } from "./models/store.models";

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
