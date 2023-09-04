import { useContext, useEffect, useRef } from "react";
import SocketContext from "../../socketIO/socketContext";
import { processCue } from "../../js/processCue";
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";
import { socket } from "../../socketIO/socket-service";
import DotAnimation from "../../DotAnimation";

import * as emitSocket from "../../socketIO/emit";
import CueCardControls from "./CueCardControls";

const CueCard = () => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  });


  const { socket_connected } = useContext(SocketContext);
  // const { setProcessingResults, processingResults } = useContext(
  //   ReadingSessionContext,
  // );

  const cue = "They have big feet.";

  useEffect(() => {
    if (socket_connected) {
      let processedCue = processCue(cue);
      emitSocket.cue_data(processedCue);
      emitSocket.handleStream();
    }
  }, [socket_connected]);

  // socket.on("processing_results", () => {
  //   setProcessingResults(true);
  // });


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
