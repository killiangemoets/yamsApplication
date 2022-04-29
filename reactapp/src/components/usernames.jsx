import React from "react";

export default function Usernames(props) {
  function renderInputs(num) {
    let inputs = [];
    for (let i = 0; i < num; i++) {
      inputs.push(
        <div key={i}>
          <label className="label-usernames">Player {i + 1}</label>
          <input
            className="input-usernames"
            type="text"
            required
            placeholder="A super cool username"
            name="message"
            // value=""
            onChange={(e) => props.getUsernames(e.target.value, i)}
          />
        </div>
      );
    }
    return inputs;
  }
  return (
    <div className="background-menu usernames">
      <div className="usernames-menu">
        <div className="usernames-form-box">
          <form className="usernames-form">
            {renderInputs(props.numPlayers)}
          </form>
          <div className="btn-usernames-box">
            <p className="invalid-message">{props.invalidUsernames}</p>
            <button
              className="btn--usernames"
              onClick={() => props.startGame(props.numPlayers)}
            >
              Play
            </button>
          </div>
        </div>
        {/* <div>
          <button className="btn--num-players" onClick={() => props.init()}>
            Skip
          </button>
        </div> */}
      </div>
    </div>
  );
}
