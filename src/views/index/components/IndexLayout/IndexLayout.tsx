// Dependencies
import React from "react";
import { Link } from "react-router-dom";

// Components
import Banner from "../Banner/Banner";
import NavBar from "../../../shared/components/NavBar/NavBar";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faCopyright } from "@fortawesome/free-solid-svg-icons";

// Images
import creciLogo from "../../../../assets/img/creciLogo.png";

export default function IndexLayout(): JSX.Element {
  return (
    <div className="container">
      <NavBar />

      <Banner />

      <p
        className="text-center mt-5"
        style={{ fontSize: 30, color: "#bbbbbb" }}
      >
        Be welcome to the best page to see the latest information about your
        favorites movies.
      </p>

      <div className="d-flex justify-content-center">
        <Link to="/movies">
          <button className="btn btn-outline-primary" type="button">
            <FontAwesomeIcon icon={faFilm} /> Go to Movies{" "}
            <FontAwesomeIcon icon={faFilm} />
          </button>
        </Link>
      </div>

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />

      <div className="row">
        <div className="col-sm mt-4 d-flex flex-column justify-content-center">
          <p className="text-center" style={{ color: "#5a606b" }}>
            This is a react software test developed to the CRECI company
          </p>
          <img
            className="m-auto"
            src={creciLogo}
            alt="creci logo"
            style={{ height: 80, width: 109 }}
          />
        </div>

        <div className="col-sm mt-4">
          <p className="text-center" style={{ color: "#5a606b" }}>
            By: L. Eduardo Hurtado, in Colombia
          </p>

          <p className="text-center" style={{ color: "#5a606b" }}>
            <FontAwesomeIcon icon={faCopyright} /> Copyright: all rights
            reserved
          </p>
        </div>
      </div>

      <div style={{ height: 50 }}></div>
    </div>
  );
}
