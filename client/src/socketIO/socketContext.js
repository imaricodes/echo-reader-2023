import { createContext } from "react"; 
const SocketContext = createContext({
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
export default SocketContext;