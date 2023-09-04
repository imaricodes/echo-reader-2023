import { useState, useEffect } from "react";
import SocketContext from "./socketContext";
import { initSockets } from "./socket-service";

const SocketProvider = (props) => {
  const [value, setValue] = useState({
    socket_connected: false,
    cue_data: {},
    session_results: {},
    speech_api_active: false,
    google_speech_receiving: false,
    processing_results: false,
    stop_media_recorder: false,
    chatGPT_results: {},
    chatGPT_response: {},
    chatGPT_error: "",
    error: "",
  });
  
  useEffect(() => initSockets({ setValue }), [initSockets]);
  // Note, we are passing setValue ^ to initSockets
  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
