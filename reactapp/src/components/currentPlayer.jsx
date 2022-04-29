import React from "react";

export default function CurrentPlayer(props) {
  return (
    <>
      <h1 className="player-title">{props.currentUsername}</h1>
    </>
  );
}
