import React, { useContext, useState, useEffect } from "react";
import { SessionContext } from "../../contexts/SessionContext";
import SessionButton from "../SessionButton/SessionButton";

const ControlsContainer = (props) => {
  const { sessionState, setSessionState } = useContext(SessionContext);

  const [instructionsText, setInstructionsText] = useState(
    "Click 'Go' to load a sentence."
  );

  useEffect(() => {
    sessionState === "start" &&
      setInstructionsText(
        "Click 'Start'. Read the sentence aloud. Wait for results..."
      );
    sessionState === "listen" &&
      setInstructionsText("Click Cancel to end the session");
    sessionState === "cancel" &&
      setInstructionsText("Click 'Go' to load a sentence.");
    sessionState === "results" &&
      setInstructionsText("Click 'Again' to read another sentence.");
    sessionState === "go" &&
      setInstructionsText("Click 'Go' to load a sentence.");
    sessionState === "timeUp" &&
      setInstructionsText("Click 'Again' to read another sentence.");
  }, [sessionState]);

  return (
    <div className="card card__controls-container card__controls-container--height card__controls-container--flex-column card__controls-container--text card__controls-container--padding card__controls-container--margin  gap-7 bg-yellow-100 sm:h-24 sm:flex-row  sm:justify-between">
      <div className="">{instructionsText}</div>
      <div>
        <SessionButton />
      </div>
    </div>
  );
};

export default ControlsContainer;
