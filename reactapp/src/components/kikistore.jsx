import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

export default function KikiStore() {
  return (
    <div className="background-kikistore">
      <div className="content-kikistore">
        <div className="logo-kikistore">
          <h1 className="kikistore">KikiStore</h1>
          <div className="game-icon-div">
            <FontAwesomeIcon className="game-icon" icon={faGamepad} />
          </div>
        </div>

        <div className="presents-div">
          <h6>presents</h6>
        </div>
      </div>
    </div>
  );
}
