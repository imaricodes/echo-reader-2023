import React, { useState, useEffect, useRef } from "react";
import { displayResponses, testDisplayAppend } from "../../js/displayUtilities";
import styles from "./ResultsCard.module.css";
// import { set } from "y";

const ResultsCard = (props) => {
  const sessionResult = props.sessionResult;
  const [cardWidth, setCardWidth] = useState(0);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridTextSize, setGridTextSize] = useState("text-3xl");
  const [displayData, setDisplayData] = useState(sessionResult);

  const gridRef = useRef();
  const cardRef = useRef();
  const resultDisplayRef = useRef();




  // CREATE OBSERVERS //

  // HANDLE RESIZE OF GRID //
  useEffect(() => {
    console.log("running observer use effect");
    const cardObserver = new ResizeObserver((entries) => {
      // console.log('initial entrie object: ', entries[0])
      // console.log('initial entrie object width: ')
      // console.log('initial entrie object apple: ')
      for (let entry of entries) {
        const cr = entry.contentRect;
        // doTheSizeThing(cr.width);
        console.log("Element:", entry.target);
        console.log(`Card size: ${cr.width}px x ${cr.height}px`);
        console.log(`Card padding: ${cr.top}px ; ${cr.left}px`);
        setCardWidth(cr.width);
        // testRef.current.innerHTML = cr.width;
      }
    });

    cardObserver.observe(cardRef.current);

    const gridObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        console.log("Element:", entry.target);
        console.log(`Grid size: ${cr.width}px x ${cr.height}px`);
        console.log(`Grid padding: ${cr.top}px ; ${cr.left}px`);
        setGridWidth(cr.width);
      }
    });

    gridObserver.observe(gridRef.current);

    return () => {
      // cardObserver.unobserve(cardRef.current);
      // gridObserver.unobserve(gridRef.current);
    };
  }, []);


  //TODO: this is where display grid items will reruun if grid too wide
  useEffect(() => {
    console.log('cardWidth State state', cardWidth)
    console.log('gridWidth State state', gridWidth)

    if (gridWidth > cardWidth -20) {
      console.log('grid is wider than card')
      console.log(gridRef.current)
      setGridTextSize("text-xs")
      // gridRef.current.classList.add("text-xm")
      // displayGridItems(displayData);
    } else { 
      setGridTextSize("text-3xl")
    }
  },[cardWidth]);

  // DISPLAY UTILITIES FUNCTTION //
  //this should run initially on mount, then whenever certain conditions are met
 
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

  //CLEAR CUE LOCAL STORAGE
  useEffect(() => {
    if (localStorage.getItem("cue") !== null) {
      localStorage.removeItem("cue");
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className=" card card__stage card__display--flex-column  card__results-card result-card card__stage--text"
    >
      <div
        className={`${gridTextSize}`}
        ref={gridRef}
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
