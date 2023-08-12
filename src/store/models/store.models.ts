import IMovieDetails from "models/IMovieDetails.model";

export interface IAppState {
  movieDetails: IMovieDetails | null;
  casts: ICasts[] | null;
  similarMovies: IMovies[] | null;
}

export interface IAction {
  type: string;
  data: IMovieDetails;
  castsData: ICasts[];
  similarMoviesData: IMovies[];
  payload: [];
}

export interface ICasts {
  id: number;
  character: string;
  name: string;
  image: string;
}

export interface IMovies {
  id: number[];
  backPoster: string;
  popularity: number;
  title: string;
  poster: string;
  overview: string;
  rating: number;
}
