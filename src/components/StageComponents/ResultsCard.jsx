import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

const ResultsCard = (props) => {
  //TODO: Get session result from session context instead of props
  const sessionResult = props.sessionResult;
  const [gridTextSize, setGridTextSize] = useState(36);
  const [currentGridWidth, setCurrentGridWidth] = useState(0);
  const [displayData, setDisplayData] = useState(sessionResult);

  const resultDisplayRef = useRef();
  const gridRef = useRef();
  const cardRef = useRef();
  const gridRefWidth = useRef();
  const cardRefWidth = useRef();

  const decreaseTextSize = () => {
    if (gridTextSize <=4) {
     return
    };
    setGridTextSize((prev) => prev - 1);
  }

  const increaseTextSize = () => {
    
     if (gridTextSize >= 36) {
      return;
    }
    setGridTextSize((prev) => prev + 2);
  }

  //ADD OBSERVER TO CARD REF
  useEffect(() => {
    // console.log('useEffect create resize observer')
    const resizeObserver = new ResizeObserver((entries) => {
      // console.log('resize observer called')

      cardRefWidth.current = entries[0].contentRect.width;
      // console.log('cardRefWidth.current in observer callback', cardRefWidth.current)

      const { width:gridWidth } = gridRef.current.getBoundingClientRect();

      if (cardRefWidth.current < gridWidth) {
        // console.log('cardRefWidth.current > gridmwidth in resize observer callback')
        decreaseTextSize();
      }
      setCurrentGridWidth(gridWidth);
      // console.log('Current grid Width state state set here causing re-render. width: ', gridWidth)

    });

    resizeObserver.observe(cardRef.current);


    return () => {
      // TODO: disconnect resize observer
      resizeObserver.disconnect()

    };
  }, []);

  useLayoutEffect(() => {
    // console.log(`use layout effect with dep  array called ${countRef.current} times`)
    // console.log(`current Text Size: ${gridTextSize}`)
    // console.log('gridRefWidth.current in layout effect #1', gridRefWidth.current)
    if (cardRefWidth.current < gridRefWidth.current) {
      // console.log('currentGridWidth > cardRefWidth.current')
      decreaseTextSize();
    }

  }, [currentGridWidth]);

  useLayoutEffect(() => {
    // console.log(`use layout effect number two called`)

    const { width: gridWidth } = gridRef.current.getBoundingClientRect();
    gridRefWidth.current = gridWidth;
    // console.log('gridRefWidth.current in layout effect #2', gridRefWidth.current)

    const { width: cardWidth } = cardRef.current.getBoundingClientRect();
    cardRefWidth.current = cardWidth;
    // console.log('gridRefWidth.current in layout effect #2', cardRefWidth.current)

    setCurrentGridWidth(gridWidth);

  }, [gridTextSize]);


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
      className=" card card__stage card__display--flex-column card__results-card  px-2 relative"
    >
    
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
  
      <div className="flex font-semibold absolute bottom-6">
        <button onClick={decreaseTextSize} className=" flex items-center justify-center text-xl text-white bg-red-400 h-6 w-6 rounded-md ">-</button>
        <span className=" inline-block ml-4 mr-4">
        Text Size
          </span>
          <button onClick={increaseTextSize} className="flex items-center justify-center text-xl text-white bg-green-400 h-6 w-6 rounded-md">+</button>

      </div>
   

    </div>
  );
};

export default ResultsCard;
