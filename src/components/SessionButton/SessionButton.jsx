import React, {useState, useEffect, useContext} from "react";
import { SessionContext } from "../../contexts/SessionContext";

const SessionButton = (props) => {
  const {sessionState, setSessionState} = useContext(SessionContext);
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
    if (sessionState==="go" || sessionState ==="cancel") {
      setButtonText("Start")
      setSessionState('start')
      console.log('go button clicked')
    }
    
   if (sessionState==="start") {
      setButtonText("Cancel")
      setSessionState('listen')
    }
 

    if (sessionState==="listen") {
      setButtonText("Go")
      setSessionState('cancel')
    }
    if (sessionState==="restart") {
      setButtonText("Go")
      setSessionState('go')
    }

  };

  return (
    <div>
      <button
        className={`bg-green-500 hover:bg-green-700 text-white font-bold w-16 h-8 rounded-full`}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SessionButton;
