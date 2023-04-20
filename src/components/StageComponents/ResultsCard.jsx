import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { displayResponses, testDisplayAppend } from "../../js/displayUtilities";
import styles from "./ResultsCard.module.css";

const ResultsCard = (props) => {
  const sessionResult = props.sessionResult;
  const [cardWidth, setCardWidth] = useState(0);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridTextSize, setGridTextSize] = useState(24);
  const [displayData, setDisplayData] = useState(sessionResult);

  const gridRef = useRef();


  function useHookWithRefCallback() {
    const ref = useRef(null)
    const setRef = useCallback(node => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }
      
      if (node) {
        // Check if a node is actually passed. Otherwise node would be null.
        // You can now do what you need to, addEventListeners, measure, etc.
      }
      
      // Save a reference to the node
      ref.current = node
    }, [])
    
    return [setRef]
  }

    const [cardRef] = useHookWithRefCallback();

  const decreaseTextSize = (cardWidthCurrent, gridWidthCurrent) => {
      console.log( `card width state: ${cardWidthCurrent}, grid: ${gridWidthCurrent}`)
      setGridTextSize((prev) => {
        console.log("prev: ", prev);
        console.log("prev - 1: ", prev - 1);
        return prev - 1;
      });
  };

  // useEffect(() => {
  //   let gridWidthCurrent = gridRef.current.clientWidth;
  //   if (gridWidthCurrent > cardWidth) {
  //     decreaseTextSize(cardWidth, gridWidthCurrent);
  //   }
    
  // }, [gridTextSize]);

  const onResize = (entries) => {
    const entry = entries[0];
    let gridWidthCurrent = gridRef.current.clientWidth;
    let cardWidthCurrent = entry.contentRect.width;
    setCardWidth(cardWidthCurrent);
    console.log("card with: ", cardWidthCurrent);
    console.log("grid width: ", gridWidthCurrent);

    if (gridWidthCurrent > cardWidthCurrent) {
      
      console.log(
        `grid is wider than card by ${gridWidthCurrent - cardWidthCurrent}`
      );
      decreaseTextSize(cardWidthCurrent, gridWidthCurrent);
    }
  };

//NEW RESIZE OBSERVER
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      const card = entries[0];
      const grid = entries[1];
      console.log('grid ref: ', gridRef.current)
      console.log('card ref: ', cardRef.current)
      console.log("new card width: ", card.contentRect.width)
      console.log("new grid width: ", grid)
   
    });

    resizeObserver.observe(cardRef);
    resizeObserver.observe(gridRef.current);

    return () => {
      // resizeObserver.disconnect();

    }
  }, []);

  //ORIGINAL RESIZE OBSERVER

  // useEffect(() => {
  //   const resizeObserver = new ResizeObserver(onResize);
  //   console.log("cardRef: ", cardRef.current);
  //   resizeObserver.observe(cardRef.current);

  //   return () => {
  //     resizeObserver.disconnect();

  //   }
  // }, []);

  const resultDisplayRef = useRef();

  

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
      className=" card px-1 card__stage card__display--flex-column  card__results-card"
    >
      <div
        // className={`text-[${gridTextSize}px]`}
        ref={gridRef}
        style={{
          fontSize: `${gridTextSize}px`,
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
