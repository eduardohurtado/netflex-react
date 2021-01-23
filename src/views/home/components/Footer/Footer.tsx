// Dependencies
import React from "react";

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

export default function Footer(): JSX.Element {
  return (
    <>
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
    </>
  );
}
