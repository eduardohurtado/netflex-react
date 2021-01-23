import React from "react";
import { Link } from "react-router-dom";

export default function IndexLayout(): JSX.Element {
  return (
    <div>
      <Link to="/home">
        <button>Go to home</button>
      </Link>
    </div>
  );
}
