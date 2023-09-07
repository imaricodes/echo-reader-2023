import { useContext, useEffect, useRef } from "react";
import SocketContext from "../../socketIO/socketContext";
import { processCue } from "../../js/processCue";
import { socket } from "../../socketIO/socket-service";
import * as emitSocket from "../../socketIO/emit";
import { useLocalStorage } from "../../hooks/useStorage";
import CueCardControls from "./CueCardControls";

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
    <div className="card card__stage card__display--flex-column  card__stage--text lg:width[500px] relative">
      <CueCardControls />
      <div className="h-40 w-full relative flex justify-center items-center">
        {cue}
      </div>
    </div>
  );
};

export default CueCard;
