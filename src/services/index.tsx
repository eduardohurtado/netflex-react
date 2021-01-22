import axios from "axios";

const apiKey = "98179848b35435b028ff7dc5f9d382d7";
const URI = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${URI}/movie/now_playing`;
// const toPratedUrl = `${URI}/movie/top_rated`;
// const movieUrl = `${URI}/movie/`;
// const genereUrl = `${URI}/genre/movie/list`;
// const moviesUrl = `${URI}/discover/movie`;
// const personUrl = `${URI}/trending/person/week`;

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

export const fetchMovies = async (): Promise<IMovies | null> => {
  try {
    const { data } = await axios.get(nowPlayingUrl, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1
      }
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";

    const modifiedData = data["results"].map((m: IMoviesFromServer) => ({
      id: m["id"],
      backPoster: posterUrl + m["backdrop_path"],
      popularity: m["popularity"],
      title: m["title"],
      poster: posterUrl + m["poster_path"],
      overview: m["overview"],
      rating: m["vote_average"]
    }));

    return modifiedData;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchGenre = (): void => {
  //
};
export const fetchMovieByGenre = (): void => {
  //
};

export const fetchPersons = (): void => {
  //
};
export const fetchTopRatedMovie = (): void => {
  //
};

export const fetchMovieDetail = (): void => {
  //
};

export const fetchMovieVideos = (): void => {
  //
};

export const fetchCasts = (): void => {
  //
};

export const fetchSimilarMovie = (): void => {
  //
};
