// Models
import IMovieDetails from "../models/IMovieDetails";

// Interfaces
interface IAction {
  type: string;
  data: IMovieDetails;
  castsData: ICasts[];
  payload: [];
}
interface IAppState {
  movieDetails: IMovieDetails | null;
  casts: ICasts[] | null;
}
interface ICasts {
  id: number;
  character: string;
  name: string;
  image: string;
}

//APP default initial state
const appState: IAppState = {
  movieDetails: null,
  casts: null
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
  }

  return state;
};

export default reducer;
