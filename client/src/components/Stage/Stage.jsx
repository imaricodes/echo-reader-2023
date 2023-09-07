import { useContext, useState, useEffect, useRef, useCallback } from "react";


// import { SessionContext } from "../../contexts/SessionContext";
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";
import SocketContext from "../../socketIO/socketContext";
import { socket } from "../../socketIO/socket-service";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StartCard from "../StageComponents/StartCard";
import ResultsCard from "../StageComponents/ResultsCard";
import ResultCard from "../StageComponents/ResultCard";
import TimeUpCard from "../StageComponents/TimeUpCard";
import SessionInstructions from "./SessionInstructions";
import CueCard from "../StageComponents/CueCard";
// import { useSocketConnect } from "../../socketIO/socket-service";

import useSocketConnect from "../../hooks/useSocketConnect";

const Stage = () => {

const [stageState, setStageState] = useState('instruction')

  
  const {
    readingSessionIsActive,
    setReadingSessionIsActive,

  } = useContext(ReadingSessionContext);

  const { session_results } = useContext(SocketContext);

const {connectSocket, disconnectSocket} = useSocketConnect();


useEffect(()=> {
  connectSocket();
  return () => {
    disconnectSocket();
  }

}, [connectSocket, disconnectSocket])

useEffect( () => {
  session_results.length > 0 && setStageState('result')
}, [session_results])


  return (

    
      <div className="stage stage--height lg:mb-0 lg:h-[300px] ">
       
       <p>This is the stage</p>
       {stageState === 'instruction' ? <SessionInstructions setStageState={setStageState} /> : null}
       {stageState === 'cue' ? <CueCard setStageState={setStageState} /> : null}
       {stageState === 'result' ? <ResultsCard setStageState={setStageState} /> : null}
      </div>

  
  );
};

export default Stage;
