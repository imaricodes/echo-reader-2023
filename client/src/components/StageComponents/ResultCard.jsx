import { useState, useEffect } from "react";

const ResultCard = ({ setStageState }) => {
  const [results, setResults] = useState(() => {
    let initialState = JSON.parse(localStorage.getItem("session_results"));
    console.log("initial state", initialState);
    return initialState;
  });

  useEffect(() => {
    console.log("stored session results ", results[0]);
  });

  return <div>ResultCard</div>;
};

export default ResultCard;
