import React, { useEffect, useState, Dispatch } from "react";
import { useParams } from "react-router-dom";

//Global state REDUX
import { connect } from "react-redux";

// Interfaces
interface IProps {
  state: {
    casts: ICasts[] | null;
  };
  fetchCastsAsync(movie_id: string): void;
}
interface IReduxState {
  casts: ICasts[] | null;
}
interface ICasts {
  id: number;
  character: string;
  name: string;
  image: string;
}

function Casts(props: IProps) {
  const [casts, setCasts] = useState<ICasts[] | null>();

  const params: { id: string } = useParams();

  useEffect(() => {
    if (params.id) {
      // Call saga to get data to REDUX state
      props.fetchCastsAsync(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    // Set local state from REDUX state change
    if (props.state.casts) {
      setCasts(props.state.casts);
    }
  }, [props.state]);

  const castsList = casts?.slice(0, 4).map((item, index) => {
    return (
      <div key={index} className="col-md-3 text-center">
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={item.image}
          alt={item.name}
        />
        <p className="font-weight-bold text-center">{item.name} </p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {item.character}
        </p>
      </div>
    );
  });

  return (
    <>
      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>

      <div className="row mt-3">{castsList}</div>
    </>
  );
}

const mapStateToProps = (state: IReduxState) => {
  return {
    //Passing the current state of "store.js" because
    state //mapDispatchToProps don't work without
  }; //define mapStateToProps.
};

const mapDispatchToProps = (
  dispatch: Dispatch<{ type: string; movie_id: string }>
) => ({
  fetchCastsAsync(movie_id: string) {
    dispatch({
      type: "FETCH_CASTS_ASYNC",
      movie_id
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Casts);
