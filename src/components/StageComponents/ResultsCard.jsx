import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

const ResultsCard = (props) => {
  //TODO: Get session result from session context instead of props
  const sessionResult = props.sessionResult;
  const [gridTextSize, setGridTextSize] = useState(24);
  const [currentGridWidth, setCurrentGridWidth] = useState(0);
  const [displayData, setDisplayData] = useState(sessionResult);

  const resultDisplayRef = useRef();
  const gridRef = useRef();
  const cardRef = useRef();
  const gridRefWidth = useRef();
  const cardRefWidth = useRef();

  const decreaseTextSize = () => {

    // if (gridTextSize <= 4) {
    //   return;
    // }
    console.log('decrease text function current font size: ', gridTextSize)
    setGridTextSize((prev) => prev - 1);
  };

  const increaseTextSize = () => {
    
    //  if (gridTextSize >= 36) {
    //   return;
    // }
   
    setGridTextSize((prev) => prev + 1)
  };

  const adjustGridSize = () => {
    const resizeGridObserver = new ResizeObserver((entries) => {
      console.log("new grid width: ", entries[0].contentRect.width);
      gridRefWidth.current = entries[0].contentRect.width;
      console.log("gridRefWidth in getWidthfunction: ", gridRefWidth.current);
      console.log("cardRefWidth in getWidthfunction: ", cardRefWidth.current);
      // if (gridRefWidth.current = cardRefWidth.current -1) {
      //   return
      // }

      if (gridRefWidth.current > cardRefWidth.current) {
        console.log(
          `grid is wider than card by ${
            gridRefWidth.current - cardRefWidth.current
          } pixels`
        );
        decreaseTextSize();
      }
      // else if (gridRefWidth.current < cardRefWidth.current -30) {
      //   console.log(`grid is narrower than card by ${cardRefWidth.current - gridRefWidth.current} pixels`);
      //   setGridTextSize(36);
      //   increaseTextSize(cardRefWidth.current, gridRefWidth.current);
      // }
    });

    resizeGridObserver.observe(gridRef.current);
  };

  const fitText = () => {
    console.log("fit text cardRefWidth.current", cardRefWidth.current);
    console.log("fit text gridRefWidth.current", gridRefWidth.current);
    // console.log('fit text clicked')
    if (gridRefWidth.current < cardRefWidth.current - 5) {
      console.log(
        "difference in width: ",
        cardRefWidth.current - gridRefWidth.current
      );
      setGridTextSize(prev => prev + 1);
    }
  };

  useLayoutEffect(() => {
    const { width } = gridRef.current.getBoundingClientRect();
    gridRefWidth.current = width;
    console.log("set current grid width state", width);
    setCurrentGridWidth(width);
    // setTooltipHeight(height); // Re-render now that you know the real height
  }, []);

  //ADD OBSERVER TO CARD REF
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      cardRefWidth.current = entries[0].contentRect.width;
      adjustGridSize();
    });

    resizeObserver.observe(cardRef.current);

    return () => {
      //TODO: disconnect resize observer
    };
  }, []);

  // DISPLAY UTILITIES FUNCTTION //
  //TODO: move out of this component ...custom hook?

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
      className=" card card__stage card__display--flex-column card__results-card  px-1"
    >
      <div>
        <button className="bg-green-400 text-white mr-20" onClick={decreaseTextSize}>Decrease text</button>
        <button className="bg-red-400 text-white" onClick={increaseTextSize}>Increase text</button>
      </div>
      <div
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
