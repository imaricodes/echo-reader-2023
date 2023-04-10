import React, {useState, useEffect, useContext, useRef} from "react";
import { SessionContext } from "../../contexts/SessionContext";

const SessionButton = (props) => {
  const {sessionState, setSessionState, isRecording, setIsRecording, socket} = useContext(SessionContext);
  const [buttonText, setButtonText] = useState("Go");
  const buttonRef = useRef(null);

  useEffect(() => {
    if (sessionState === "results") {
      setButtonText("Again")
      // setSessionState('restart')
    }

    if (sessionState === "timeUp") {
      setButtonText("Again")

    }

    if (sessionState === "go") {
      setButtonText("Go")
    }

    if (sessionState === "listen") {
      buttonRef.current.classList.remove('bg-green-500', 'hover:bg-green-700')
      buttonRef.current.classList.add('bg-red-500', 'hover:bg-red-700')
    }

    if (sessionState !== "listen") {
      buttonRef.current.classList.contains('bg-red-500') 
      ?
      (buttonRef.current.classList.remove('bg-red-500', 'hover:bg-red-700'),
      (buttonRef.current.classList.add('bg-green-500', 'hover:bg-green-700')))
      :
      null
    }

 


    return () => {
    }
  }, [sessionState])

  let handleClick = () => {
    if (sessionState==="go") {
      setButtonText("Start")
      setSessionState('start')
    }
    if (sessionState==="start") {
      setButtonText("Cancel")
      setSessionState('listen')
      setIsRecording(true)
    }

    //if button clicked during listen state, cancel session and reload a new cue sentence card
    if (sessionState==="listen") {
      setButtonText("Start")
      setSessionState('start')
      setIsRecording(false);
      socket.emit("cancel_session", "cancel_session from sessionButton cancel button");
    }


    //this state set when socket.on('results_processed') is triggered in stage component, resultsCard is rendered
    //but, if clicked, cue sentence card is rendered and sessionState is set to 'restart'
    if (sessionState==="results" || sessionState==="timeUp") {
      setButtonText("Start")
      setSessionState('start')
      setIsRecording(false)
    }

    // if (sessionState==="restart") {
    //   setButtonText("Go")
    //   setSessionState('go')
    // }

  };

  return (
    <div>
      <button
        ref={buttonRef}
        className={ `btn bg-green-500 hover:bg-green-700 xl:text-l`}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SessionButton;
