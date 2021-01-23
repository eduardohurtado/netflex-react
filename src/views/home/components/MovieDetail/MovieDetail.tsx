// Dependencies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../../../../services";
import ReactStars from "react-rating-stars-component";

// Models
import IMovieDetails from "../../../../models/MovieDetails";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

interface IParams {
  id: string;
}

interface IGenres {
  id: number;
  name: string;
}

export default function MovieDetail(): JSX.Element {
  const [detail, setDetail] = useState<IMovieDetails | null>(null);
  const [genresList, setGenresList] = useState<IGenres[]>([]);

  const params: IParams = useParams();

  useEffect(() => {
    if (params) {
      const fetchAPI = async () => {
        setDetail(await fetchMovieDetail(params.id));
      };

      fetchAPI();
    }
  }, []);

  useEffect(() => {
    if (detail?.genres) {
      setGenresList(detail.genres);
    }
  }, [detail]);

  const showGenresList = genresList.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button className="btn btn-outline-info" type="button">
          {item.name}
        </button>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="container-fluid mt-1">
        <img
          src={`https://image.tmdb.org/t/p/original/${detail?.backdrop_path}`}
          alt={detail?.title}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h2 className="text-center mt-2">{detail?.title}</h2>

      <h4 className="text-center" style={{ color: "#666666" }}>
        {detail?.tagline && <i>{`"${detail?.tagline}"`}</i>}
      </h4>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="list-inline">{showGenresList}</div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail?.vote_average}
              size={20}
              color1={"#f4c10f"}
            ></ReactStars>
          </div>

          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
            <p>{detail?.overview}</p>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
            SIMILAR MOVIES
          </p>
        </div>
      </div>

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />

      <div className="row mt-3">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3 className="font-weight-bold">ABOUT ME</h3>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
            doloremque at repudiandae inventore iusto quis, maiores provident?
            Ipsa, iusto rem modi aut tempore officiis facere. Ea eos nemo harum
            dicta?
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi
            fugit aliquam nostrum libero, deleniti voluptate fuga? Fugit
            inventore voluptatibus, eos animi a beatae possimus autem neque
            ipsum similique praesentium?
          </p>

          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" target="_blank">
                <FontAwesomeIcon
                  icon={faGithub}
                  style={{ fontSize: 25, color: "#f4c10f" }}
                />
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>KEEP IN TOUCH</h3>

          <ul className="list-unstyled">
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <strong>&nbsp;Address:</strong> city, state, country
            </li>
            <li>
              <FontAwesomeIcon icon={faPhoneAlt} />
              <strong>&nbsp;Phone:</strong> +57 311 234 1234
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <strong>&nbsp;Email:</strong> lehurtadog@gmail.com
            </li>
          </ul>
        </div>
      </div>

      <div style={{ height: 50 }}></div>
    </div>
  );
}
