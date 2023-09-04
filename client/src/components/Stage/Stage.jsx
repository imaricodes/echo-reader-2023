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



  
  const {
    readingSessionIsActive,
    setReadingSessionIsActive,
    stageState,
    setStageState,
  } = useContext(ReadingSessionContext);

  // const { socket_connected, cue_data, session_results, close_recorder, error } = useContext(SocketContext);

const {connectSocket, disconnectSocket} = useSocketConnect();


useEffect(()=> {
  connectSocket();
  return () => {
    disconnectSocket();
  }

}, [connectSocket, disconnectSocket])

//  socket.on("results_processed", () => {
//   setStageState('result')
//  })


  return (
    
      <div className="stage stage--height lg:mb-0 lg:h-[300px] ">
       
       <p>This is the stage</p>
       {stageState === 'instruction' ? <SessionInstructions /> : null}
       {stageState === 'cue' ? <CueCard /> : null}
       {stageState === 'result' ? <ResultsCard /> : null}
      </div>
  
  );
};

export default Stage;
