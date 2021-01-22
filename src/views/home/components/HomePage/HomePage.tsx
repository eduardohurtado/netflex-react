// Dependencies
import React, { useState, useEffect } from "react";
import RBCarousel from "react-bootstrap-carousel";

// Services
import { fetchMovies } from "../../../../services";

interface IMovies {
  id: number[];
  backPoster: string;
  popularity: number;
  title: string;
  poster: string;
  overview: string;
  rating: number;
}

export default function HomePage(): JSX.Element {
  const [nowPlaying, setNowPlaying] = useState([]);
  // const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(((await fetchMovies()) as unknown) as []);
      // setGenres(await fetchGenre());
    };

    fetchAPI();
  }, []);

  const movies = nowPlaying.slice(0, 5).map((item: IMovies, index: number) => {
    return (
      <div key={index}>
        <div className="carousel-center mt-1">
          <img
            src={item.backPoster}
            alt={item.title}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="carousel-caption">{item.title} </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <RBCarousel
            autoplay={true}
            pauseOnVisibility={true}
            slidesShowSpeed={500}
            version={4}
          >
            {movies}
          </RBCarousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col"></div>
      </div>
    </div>
  );
}
