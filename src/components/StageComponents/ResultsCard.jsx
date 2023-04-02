import React, {useState, useEffect, useRef} from 'react'
import { displayResponses, testDisplayAppend } from '../../js/displayUtilities'
import styles from './ResultsCard.module.css'

const ResultsCard = (props) => {
const sessionResult = props.sessionResult

const [displayData, setDisplayData]=useState(sessionResult)


  const resultDisplayRef = useRef()



  const length = displayData[0].length;

  let displayGridItems = (displayData) => {
    let elements = [];

    //append cue result card ref
    for (let i = 0; i < length; i++) {
      const word = displayData[0 + 1][i];
      elements.push(
        React.createElement("div", { 
          className: `card__results-card__grid-item`,
          key: i
        },word)
        
      );
    }

    //append res to result card ref
    for (let i = 0; i < length; i++) {
      let word = "";
      let matchStatus = "";

      if (displayData[i + 2].match === "false") {
        matchStatus = "card__results-card__response-word--color-error";
       
      } else matchStatus = "card__results-card__response-word--color-correct"
      

      word = displayData[i + 2].responseDisplayWord;

      elements.push(
        React.createElement(
          "div",
          { 
            className: `card__results-card__grid-item ${matchStatus}`,
            key: i + length
           },
          word
        )
      );
    }

    return elements;
  }

  
 
  return (
    <div className='result-card card card__stage card__results-card card__stage--text xl:card__stage--text-screen-2xl'>
        <div style={{
        display: 'grid', 
        gridTemplateColumns:`repeat(${length}, auto)` }}
        >

          {
            displayGridItems(displayData).map((item) => item)
            }

      </div>
    </div>
  )
}

export default ResultsCard