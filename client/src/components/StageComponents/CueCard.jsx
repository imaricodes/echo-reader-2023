import { useContext, useEffect, useRef } from "react";
import SocketContext from "../../socketIO/socketContext";
import { processCue } from "../../js/processCue";
import { socket } from "../../socketIO/socket-service";
import * as emitSocket from "../../socketIO/emit";
import { useLocalStorage } from "../../hooks/useStorage";
import CueCardControls from "./CueCardControls";
import Card from "../UI/Card";

const CueCard = ({ setStageState }) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  });

  const [sessionResults, setSessionResults, removeSessionResults] =
    useLocalStorage("session_results", null);

  const { socket_connected } = useContext(SocketContext);

  const cue = "They have tiny feet.";

  //TODO: runs whenever component re renders, change this behavior
  useEffect(() => {
    if (socket_connected) {
      socket.on("results_processed", (data) => {
        setSessionResults(data.response);
      });

      let processedCue = processCue(cue);
      emitSocket.send_cue_data(processedCue);
      emitSocket.start_handleStream();
    }
  });

  return (
    <>
      <CueCardControls />
      <div className="h-full flex justify-center items-center  top-0 w-full">
        <p>{cue}</p>
      </div>
    </>
  );
};

export default CueCard;
