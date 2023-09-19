//*** REACT ***//
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

//*** UTILITIES ***//
import PropTypes from "prop-types";

//*** COMPONENTS ***//
import CueCardControls from "./CueCardControls";

//*** HOOKS ***//
import { useLocalStorage } from "../../hooks/useStorage";

//*** DATA, ASSETS ***//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faSquareMinus } from "@fortawesome/free-solid-svg-icons";

const ResultsCard = ({ setStageState, stageState }) => {
  //*** REFS ***//
  const gridRef = useRef();
  const cardRef = useRef();
  const gridRefWidth = useRef();
  const cardRefWidth = useRef();

  //*** STATES, CONTEXTS, HOOKS ***//
  const [gridTextSize, setGridTextSize] = useState(36);

  const [currentGridWidth, setCurrentGridWidth] = useState(0);

  const [sessionResults, ,] = useLocalStorage("session_results", null);

  //TODO: handle no displaydata error
  const [displayData] = useState(() => {
    if (localStorage.getItem("session_results") != null) {
      let value = localStorage.getItem("session_results");
      return JSON.parse(value);
    }
  });

  //*** FUNCTIONS, HANDLERS ***//

  const decreaseTextSize = () => {
    if (gridTextSize <= 4) {
      return;
    }
    setGridTextSize((prev) => prev - 1);
  };

  const increaseTextSize = () => {
    if (gridTextSize >= 36) {
      return;
    }
    setGridTextSize((prev) => prev + 2);
  };

  let displayGridItems = (displayData) => {
    const length = sessionResults[0].length;
    let elements = [];

    for (let i = 0; i < length; i++) {
      const word = displayData[0 + 1][i];
      elements.push(
        React.createElement(
          "div",
          {
            className: `card__results-card__grid-item`,
            key: i,
          },
          word,
        ),
      );
    }

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
          word,
        ),
      );
    }

    return elements;
  };

  //*** EFFECTS ***//
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      cardRefWidth.current = entries[0].contentRect.width;

      const { width: gridWidth } = gridRef.current.getBoundingClientRect();

      if (cardRefWidth.current < gridWidth) {
        decreaseTextSize();
      }
      setCurrentGridWidth(gridWidth);
    });

    resizeObserver.observe(cardRef.current);

    return () => {
      // TODO: disconnect resize observer
      resizeObserver.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (cardRefWidth.current < gridRefWidth.current) {
      decreaseTextSize();
    }
  }, [currentGridWidth]);

  useLayoutEffect(() => {
    const { width: gridWidth } = gridRef.current.getBoundingClientRect();
    gridRefWidth.current = gridWidth;

    const { width: cardWidth } = cardRef.current.getBoundingClientRect();
    cardRefWidth.current = cardWidth;

    setCurrentGridWidth(gridWidth);
  }, [gridTextSize]);

  // DISPLAY UTILITIES FUNCTTION //
  //TODO: move out of this component ...custom hook?, tried below but not displaying correctly
  // let displayGridItems = displayResults(displayData)

  return (
    <>
      <CueCardControls stageState={stageState} setStageState={setStageState} />
      <div
        ref={cardRef}
        className="h-full flex justify-center items-center  top-0 w-full"
      >
        <div
          ref={gridRef}
          style={{
            fontSize: `${gridTextSize}px`,
            display: "grid",
            gridTemplateColumns: `repeat(${sessionResults[0].length}, auto)`,
          }}
        >
          {displayGridItems(displayData).map((item) => item)}
        </div>

        <div className="absolute bottom-3 flex  items-center justify-center xl:bottom-5">
          <a onClick={decreaseTextSize} className="cursor-pointer ">
            <FontAwesomeIcon
              icon={faSquareMinus}
              className="h-7 text-red-600"
            />
          </a>
          <span className="ml-4 mr-4 inline-block text-sm font-semibold">
            Text Size
          </span>
          <a onClick={increaseTextSize} className=" cursor-pointer ">
            <FontAwesomeIcon
              icon={faSquarePlus}
              className="h-7 text-green-600"
            />
          </a>
        </div>
      </div>
    </>
  );
};

ResultsCard.propTypes = {
  stageState: PropTypes.string.isRequired,
  setStageState: PropTypes.func.isRequired,
};

export default ResultsCard;
