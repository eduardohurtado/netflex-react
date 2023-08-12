// Dependencies
import React, { useState, useEffect } from "react";
import RBCarousel from "react-bootstrap-carousel";

// Models
import IMovies from "models/IMovies.model";

// Services
import { fetchMovies } from "services";

export default function Carousel(): JSX.Element {
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying((await fetchMovies()) as unknown as []);
    };

    fetchAPI();
  }, []);

  const movies = nowPlaying.slice(0, 8).map((item: IMovies, index: number) => {
    return (
      <div key={index}>
        <div className="carousel-center mt-1">
          <img
            src={item.backPoster}
            alt={item.title}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <div className="carousel-caption">{item.title}</div>
      </div>
    );
  });

  return (
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
  );
}
