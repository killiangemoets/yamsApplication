import React from "react";

export default function PauseMenu(props) {
  function handleLeaveGame(leave) {
    if (leave) {
      props.init();
    } else {
      document.querySelector(".pause").classList.add("hidden");
    }
  }
  return (
    <div className="background-menu pause hidden">
      <div className="pause-menu">
        <div>
          <h1 className="pause-title">Are you sure you want to leave?</h1>
        </div>
        <div className="pause-buttons">
          <button className="btn--pause" onClick={() => handleLeaveGame(true)}>
            Yes
          </button>
          <button className="btn--pause" onClick={() => handleLeaveGame(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
