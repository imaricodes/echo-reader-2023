import React, {useState, useEffect, useContext} from "react";
import { SessionContext } from "../../contexts/SessionContext";

const SessionButton = (props) => {
  const {sessionState, setSessionState, isRecording, setIsRecording} = useContext(SessionContext);
  const [buttonText, setButtonText] = useState("Go");

  useEffect(() => {
    if (sessionState==="results") {
      setButtonText("Restart")
      setSessionState('restart')
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
      setButtonText("Restart")
      setSessionState('listen')
      setIsRecording(true)
    }
 

    if (sessionState==="listen") {
      setButtonText("Start")
      setSessionState('start')
      setIsRecording(false)
    }

    if (sessionState==="results") {
      setButtonText("Start")
      setSessionState('start')
      setIsRecording(false)
    }



    if (sessionState==="restart") {
      setButtonText("Go")
      setSessionState('go')
    }

  };

  return (
    <div>
      <button
        className={ `btn bg-green-500 hover:bg-green-700`}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SessionButton;
