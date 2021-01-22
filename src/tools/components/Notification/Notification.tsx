import React, { CSSProperties } from "react";

//Store notification component
import { store } from "react-notifications-component";
import "animate.css/animate.compat.css";

export function notifySuccess(title: string, message: string): void {
  const divStyle: CSSProperties = {
    background: "#28a745",
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    color: "white",
  };

  const divSide: CSSProperties = {
    height: "100%",
    width: "10px",
    background: "#173",
  };

  const iconStyle: CSSProperties = {
    margin: "30px 20px 0 10px",
  };

  const titleStyle: CSSProperties = {
    fontSize: "18px",
  };

  const customNotification = (
    <div style={divStyle}>
      <div style={divSide}></div>
      <div style={iconStyle}>
        <img
          alt="Check"
          src="https://live.staticflickr.com/65535/50375798931_cceea26c79_o.png"
          width="32px"
          height="32px"
        />
      </div>
      <div>
        <p style={titleStyle}>
          {" "}
          <b>{title}</b>{" "}
        </p>
        <p> {message} </p>
      </div>
    </div>
  );

  store.addNotification({
    width: 330,
    insert: "top",
    container: "top-center",
    content: customNotification,
    animationIn: ["animated", "flipInX"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
    },
  });
}

export function notifyDanger(title: string, message: string): void {
  const divStyle: CSSProperties = {
    background: "#dc3545",
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    color: "white",
  };

  const divSide: CSSProperties = {
    height: "100%",
    width: "10px",
    background: "#713",
  };

  const iconStyle: CSSProperties = {
    margin: "30px 20px 0 10px",
  };

  const titleStyle: CSSProperties = {
    fontSize: "18px",
  };

  const customNotification = (
    <div style={divStyle}>
      <div style={divSide}></div>
      <div style={iconStyle}>
        <img
          alt="Error"
          src="https://live.staticflickr.com/65535/50375806451_0db9564b9d_o.png"
          width="32px"
          height="32px"
        />
      </div>
      <div>
        <p style={titleStyle}>
          <b>{title} </b>{" "}
        </p>
        <p> {message} </p>
      </div>
    </div>
  );

  store.addNotification({
    width: 330,
    insert: "top",
    container: "top-center",
    content: customNotification,
    animationIn: ["animated", "flipInX"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 5000,
      pauseOnHover: true,
    },
  });
}
