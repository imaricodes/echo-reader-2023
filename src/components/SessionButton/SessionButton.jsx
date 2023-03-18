import React, {useState, useEffect} from "react";
import styles from "./SessionButton.module.css";

const SessionButton = (props) => {

  const setSessionState = props.setSessionState
  const currentSessionsState = props.currentSessionsState
  const setIsListening = props.setIsListening

  const [buttonState, setButtonState] = useState("go");
  const [buttonText, setButtonText] = useState("Go");

  let updateButtonText = () => {

  };

  useEffect(() => {
    if (currentSessionsState==="results") {
      setButtonText("Restart")
      setSessionState('restart')
    }
  
    return () => {
      
    }
  }, [currentSessionsState])
  

  let handleClick = () => {
    if (currentSessionsState==="go" || currentSessionsState ==="cancel") {
      setButtonText("Start")
      setSessionState('start')
    }
    
   if (currentSessionsState==="start") {
      setButtonText("Cancel")
      setSessionState('listen')
    }
 

    if (currentSessionsState==="listen") {
      setButtonText("Go")
      setSessionState('cancel')
    }
    if (currentSessionsState==="restart") {
      setButtonText("Go")
      setSessionState('go')
    }

  };

  return (
    <div>
      <button
        className={`bg-green-500 hover:bg-green-700 text-white font-bold w-20 h-20 rounded-full`}

        //tailwind css round greed button
        // className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full`}

        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SessionButton;
