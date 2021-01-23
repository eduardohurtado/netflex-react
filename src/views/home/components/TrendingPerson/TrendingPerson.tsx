// Dependencies
import React, { useState, useEffect } from "react";

// Services
import { fetchPersons } from "../../../../services";

// Models
import IPersons from "../../../../models/IPersons";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

// Styles
const navigationIcon: React.CSSProperties = {
  color: "#f4c10f",
  fontSize: 30,
  fontWeight: "bolder",
  cursor: "pointer"
};

export default function TrendingPerson(): JSX.Element {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setPersons(((await fetchPersons()) as unknown) as []);
    };

    fetchAPI();
  }, []);

  const trendingPersons = persons
    .slice(0, 4)
    .map((item: IPersons, index: number) => {
      return (
        <div key={index} className="col-md-3 text-center">
          <img
            className="img-fluid rounded-circle mx-auto d-block"
            src={item.profileImg}
            alt={item.name}
          />
          <p className="font-weight-bold text-center">{item.name} </p>
          <p
            className="font-weight-light text-center"
            style={{ color: "#5a606b" }}
          >
            Trending for: {item.known}
          </p>
        </div>
      );
    });

  return (
    <>
      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TRENDING PERSON ON THIS WEEK
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="float-right">
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              style={navigationIcon}
            />
          </div>
        </div>
      </div>

      <div className="row mt-3">{trendingPersons}</div>
    </>
  );
}
