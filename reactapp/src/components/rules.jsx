import React from "react";

export default function Rules() {
  function handleReturn() {
    document.querySelector(".rules").classList.add("hidden");
  }
  return (
    <div className="background-menu rules hidden">
      <div className="rules-menu">
        <div className="rules-title-section">
          <h1 className="rules-title">Rules</h1>
        </div>
        <div className="rules-description">
          <p className="rules-text">
            Go to:{" "}
            <a
              href="http://www.stratozor.com/en/yams-rules.php"
              target="_blank"
              rel="noreferrer"
            >
              http://www.stratozor.com/en/yams-rules.php
            </a>
          </p>
        </div>
        <div className="rule-btn-section">
          <button className="btn--num-players" onClick={() => handleReturn()}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
}
