// Dependencies
import axios from "axios";

// Network
const apiKey = "98179848b35435b028ff7dc5f9d382d7";
const URI = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${URI}/movie/now_playing`;
const topRatedUrl = `${URI}/movie/top_rated`;
const movieUrl = `${URI}/movie`;
const genereUrl = `${URI}/genre/movie/list`;
const moviesUrl = `${URI}/discover/movie`;
const personUrl = `${URI}/trending/person/week`;

// Models
import IMovieDetails from "../models/IMovieDetails";

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

interface IGenresFromServer {
  id: number;
  name: string;
}

interface IPersonsFromServer {
  id: number;
  known_for: IKnownFor[];
  name: string;
  profile_path: string;
  known_for_department: string;
}

interface IKnownFor {
  popularity: number;
}

interface IPersons {
  id: number;
  popularity: number;
  name: string;
  profileImg: string;
  known: string;
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

    const modifiedData: IMovies = data["results"].map(
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

    return modifiedData;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchGenre = async (): Promise<IGenresFromServer | null> => {
  try {
    const { data } = await axios.get(genereUrl, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1
      }
    });

    const modifiedData: IGenresFromServer = data["genres"].map(
      (g: IGenresFromServer) => ({
        id: g["id"],
        name: g["name"]
      })
    );

    return modifiedData;
  } catch (error) {
    console.error(error);

    return null;
  }
};
export const fetchMovieByGenre = async (
  genre_id: number
): Promise<IMovies | null> => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1,
        with_genres: genre_id
      }
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";

    const modifiedData: IMovies = data["results"].map(
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

    return modifiedData;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchPersons = async (): Promise<IPersons | null> => {
  try {
    const { data } = await axios.get(personUrl, {
      params: {
        api_key: apiKey
      }
    });

    const modifiedData = data["results"].map((p: IPersonsFromServer) => ({
      id: p["id"],
      popularity: p.known_for[0].popularity,
      name: p["name"],
      profileImg: "https://image.tmdb.org/t/p/w200" + p["profile_path"],
      known: p["known_for_department"]
    }));

    return modifiedData;
  } catch (error) {
    console.error(error);

    return null;
  }
};
export const fetchTopRatedMovie = async (): Promise<IMovies | null> => {
  try {
    const { data } = await axios.get(topRatedUrl, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1
      }
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";

    const modifiedData: IMovies = data["results"].map(
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

    return modifiedData;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchMovieDetail = async (
  movie_id: string
): Promise<IMovieDetails | null> => {
  try {
    const { data } = await axios.get(`${movieUrl}/${movie_id}`, {
      params: {
        api_key: apiKey,
        language: "en-US"
      }
    });

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchCasts = async (
  movie_id: string
): Promise<ICasts[] | null> => {
  try {
    const { data } = await axios.get(`${movieUrl}/${movie_id}/credits`, {
      params: {
        api_key: apiKey,
        language: "en-US"
      }
    });

    const modifiedData: ICasts[] = data["cast"].map((c: ICastsFromServer) => ({
      id: c["id"],
      character: c["character"],
      name: c["name"],
      image: "https://image.tmdb.org/t/p/w200/" + c["profile_path"]
    }));

    return modifiedData;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const fetchSimilarMovie = async (
  movie_id: string
): Promise<IMovies[] | null> => {
  try {
    const { data } = await axios.get(`${movieUrl}/${movie_id}/similar`, {
      params: {
        api_key: apiKey,
        language: "en-US"
      }
    });

    const dataTyped = data as ISimilarFromServer;

    const posterUrl = "https://image.tmdb.org/t/p/original/";

    if (dataTyped.results.length > 0) {
      const modifiedData: IMovies[] = data["results"].map(
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

      return modifiedData;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);

    return null;
  }
};
