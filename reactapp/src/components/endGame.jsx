import React from "react";

export default function EndGame(props) {
  return (
    <div className="background-menu end hidden">
      <div className="end-menu">
        <div>
          <h1 className="winner-title">
            {props.usernames[props.scores.indexOf(Math.max(...props.scores))]}{" "}
            Win!
          </h1>
        </div>
        <div className="all-scores">
          {props.scores.map((score, i) => {
            return (
              <div key={i} className="one-score">
                <h6 className="player--num">{props.usernames[i]}</h6>
                <h3 className="player--score">{score}</h3>
              </div>
            );
          })}
        </div>
        <div className="best-scores">
          <h2 className="best-scores-title">Best Scores</h2>
          <div className="best-scores-list">
            {props.bestScores.map((score, i) => {
              return (
                <div key={i} className="best-score">
                  <h6 className="best-username">
                    <span>{i + 1}. </span>
                    {score.username}
                  </h6>
                  <h6 className="best-value">{score.score}</h6>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <button className="btn--num-players" onClick={() => props.init()}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
}
