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

  return <div>ResultCard

    {results[0]}
  </div>;
};

export default ResultCard;
