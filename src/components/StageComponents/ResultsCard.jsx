import React, { useState, useEffect, useRef } from "react";
import { displayResponses, testDisplayAppend } from "../../js/displayUtilities";
import styles from "./ResultsCard.module.css";

const ResultsCard = (props) => {
  const sessionResult = props.sessionResult;

  const [displayData, setDisplayData] = useState(sessionResult);

  const resultDisplayRef = useRef();

  const length = displayData[0].length;

  let displayGridItems = (displayData) => {
    let elements = [];

    //append cue result card ref
    for (let i = 0; i < length; i++) {
      const word = displayData[0 + 1][i];
      elements.push(
        React.createElement(
          "div",
          {
            className: `card__results-card__grid-item`,
            key: i,
          },
          word
        )
      );
    }

    //append res to result card ref
    for (let i = 0; i < length; i++) {
      let word = "";
      let matchStatus = "";

      if (displayData[i + 2].match === "false") {
        matchStatus = "card__results-card__response-word--color-error";
      } else if (displayData[i + 2].match === "true") {
        matchStatus = "card__results-card__response-word--color-correct";
      } else if (displayData[i + 2].match === "false-true") {
        matchStatus = "card__results-card__response-word--color-wrong-position";
      }

      word = displayData[i + 2].responseDisplayWord;

      elements.push(
        React.createElement(
          "div",
          {
            className: `card__results-card__grid-item ${matchStatus}`,
            key: i + length,
          },
          word
        )
      );
    }

    return elements;
  };

  useEffect(() => {
    //clear local storage of cue
    if (localStorage.getItem("cue") !== null) {
      localStorage.removeItem("cue");
    }
  }, []);

  return (
    <div className=" card card__stage card__display--flex-column  card__results-card result-card card__stage--text">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${length}, auto)`,
        }}
      >
        {displayGridItems(displayData).map((item) => item)}
      </div>
    </div>
  );
};

export default ResultsCard;
