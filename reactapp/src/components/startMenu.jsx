import React from "react";
// import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice } from "@fortawesome/free-solid-svg-icons";

export default function StartMenu(props) {
  return (
    <div className="background-menu start">
      <div className="start-menu">
        <div>
          <h1 className="game-title"> Yams</h1>
        </div>
        <div>
          <FontAwesomeIcon className="yams-icon" icon={faDice} />
        </div>
        <div>
          <h3 className="num-players-title">How many players want to play?</h3>
          <div className="num-players-buttons">
            {/* <Link to="/game"> */}
            <button
              className="btn--num-players"
              onClick={() => props.chooseNumPlayers(1)}
            >
              1
            </button>
            {/* </Link> */}
            {/* <Link to="/game"> */}
            <button
              className="btn--num-players"
              onClick={() => props.chooseNumPlayers(2)}
            >
              2
            </button>
            {/* </Link> */}
            {/* <Link to="/game"> */}
            <button
              className="btn--num-players"
              onClick={() => props.chooseNumPlayers(3)}
            >
              3
            </button>
            {/* </Link> */}
            {/* <Link to="/game"> */}
            <button
              className="btn--num-players"
              onClick={() => props.chooseNumPlayers(4)}
            >
              4
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
