import { useContext, useEffect, useRef } from "react";
import SocketContext from "../../socketIO/socketContext";
import { processCue } from "../../js/processCue";
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";
import DotAnimation from "../../DotAnimation";

import { socket } from "../../socketIO/socket-service";
// import useSessionStorage from "../../hooks/useSessionStorage";
import { useSessionStorage, useLocalStorage } from "../../hooks/useStorage"

import * as emitSocket from "../../socketIO/emit";
import CueCardControls from "./CueCardControls";


const CueCard = ({ setStageState }) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  });

  const [sessionResults, setSessionResults, removeSessionResults] = useLocalStorage("session_results", null)




  const { socket_connected } = useContext(SocketContext);

  // const { setProcessingResults, processingResults } = useContext(
  //   ReadingSessionContext,
  // );

  const cue = "They have tiny feet.";

  //TODO: runs whenever component re renders, change this behavior
  useEffect(() => {
    if (socket_connected) {
      socket.on("results_processed", (data) => {
        console.log("results in cue card", data.response);
        console.log('data type', Array.isArray(data.response) )
        setSessionResults(data.response) 
      });

      let processedCue = processCue(cue);
      emitSocket.send_cue_data(processedCue);
      emitSocket.start_handleStream();
    }
  });

  return (
    <div className="card card__stage card__display--flex-column  card__stage--text lg:width[500px] relative">
      <CueCardControls />
      {/* <DotAnimation /> */}
      {/* <div className=" w-full text-center bg-yellow-300 ">
        CueCard Sentence here..change to dot animation when max words
        reachededed
      </div> */}
      <div className="bg-orange-200 h-40 w-full relative flex justify-center items-center">
        {/* <DotAnimation/> */}
        {/* {processingResults ? <DotAnimation /> : <p>{cue}</p>} */}
        {cue}
        
     
      </div>
      <div>cue card render {renderCount.current}</div>
    </div>
  );
};

export default CueCard;
