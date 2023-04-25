import React, { useEffect, useContext } from "react";
import { SessionContext } from "../../contexts/SessionContext";

const StartCard = () => {
  const { sessionState, setSessionState } = useContext(SessionContext);
  useEffect(() => {
    // if (localStorage.getItem("cue") !== null) {
    //   localStorage.removeItem("cue");
    // }
 

  });

  return (
    <div className="card card__stage card__display--flex-column">

      <p className="card__start-card--text sm:text-2xl lg:text-3xl lg:leading-10 mb-3  ">
        Echo Reader uses speech recognition to help you practice reading aloud.
        </p>

      <p className="card__start-card--text sm:text-2xl lg:text-3xl lg:leading-10  ">
        ChatGPT is also used to generate feedback on your reading.
      </p>
    </div>
  );
};

export default StartCard;
