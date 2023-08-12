// Dependencies
import axios from "axios";

// Network
const apiKey = "98179848b35435b028ff7dc5f9d382d7";
const URI = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${URI}/movie/now_playing`;
const topRatedUrl = `${URI}/movie/top_rated`;
const genereUrl = `${URI}/genre/movie/list`;
const moviesUrl = `${URI}/discover/movie`;
const personUrl = `${URI}/trending/person/week`;
const keywordUrl = `${URI}/search/multi`;

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
  popularity: number;
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
    console.error("Error on fetchMovies:", error);

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
  getFetchString: string
): Promise<IMovies | null> => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1,
        with_genres: getFetchString
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
    console.error("Error on fetchMovieByGenre:", error);

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
      popularity: p.popularity,
      name: p["name"],
      profileImg: "https://image.tmdb.org/t/p/w200" + p["profile_path"],
      known: p["known_for_department"]
    }));

    return modifiedData;
  } catch (error) {
    console.error("Error on fetchPersons:", error);

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
    console.error("Error on fetchTopRatedMovie:", error);

    return null;
  }
};

export const fetchMovieByKeyword = async (
  words: string
): Promise<IMovies[] | null> => {
  try {
    const { data } = await axios.get(keywordUrl, {
      params: {
        api_key: apiKey,
        language: "en-US",
        page: 1,
        query: words
      }
    });

    const posterUrl = "https://image.tmdb.org/t/p/original/";

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
  } catch (error) {
    console.error("Error on fetchMovieByKeyword:", error);

    return null;
  }
};
