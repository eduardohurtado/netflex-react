import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(): JSX.Element {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "#30475e" }}
      >
        <a className="navbar-brand" style={{ color: "#eeeeee" }}>
          NetFlex
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/">
                <a className="nav-link" style={{ color: "#eeeeee" }}>
                  Home <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/home">
                <a className="nav-link" style={{ color: "#eeeeee" }}>
                  Movies <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
      </nav>
    </div>
  );
}
