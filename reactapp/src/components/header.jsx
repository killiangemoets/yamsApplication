import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

export default function Header(props) {
  const renderScores = function (scores) {
    const scoreCards = scores.map((score, i) => {
      return (
        <div key={i} className="total-score">
          <h6 className="player-num">{props.usernames[i]}</h6>
          <h3 className="player-score">{score}</h3>
        </div>
      );
    });
    return scoreCards;
  };

  function handlePause() {
    document
      .querySelectorAll(".background-menu")
      .forEach((menu) => menu.classList.add("hidden"));
    document.querySelector(".pause").classList.remove("hidden");
  }

  function handleRules() {
    document
      .querySelectorAll(".background-menu")
      .forEach((menu) => menu.classList.add("hidden"));
    document.querySelector(".rules").classList.remove("hidden");
  }

  return (
    <>
      <button className="btn--top btn--return" onClick={() => handlePause()}>
        <FontAwesomeIcon className="header-icon" icon={faCircleArrowLeft} />
      </button>
      <div className="total-scores">{renderScores(props.scores)}</div>

      <button
        className="btn--top btn--instruction"
        onClick={() => handleRules()}
      >
        <FontAwesomeIcon className="header-icon" icon={faCircleInfo} />
      </button>
    </>
  );
}
