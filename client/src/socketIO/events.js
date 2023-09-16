import { socket } from "./socket-service";

export const socketEvents = ({ setValue }) => {
  socket.on("connection", (data) => {
    setValue((state) => {
      return { ...state, socket_connected: `${data}` };
    });
  });

  socket.on("google_speech_receiving", (data) => {
    setValue((state) => {
      return { ...state, google_speech_receiving: `${data}` };
    });
  });

  socket.on("speech_api_active", (data) => {
    setValue((state) => {
      return { ...state, speech_api_active: `${data}` };
    });
  });

  socket.on("processing_results", (data) => {
    setValue((state) => {
      return { ...state, processing_results: `${data}` };
    });
  });

  socket.on("results_processed", (data) => {
    setValue((state) => {
      return { ...state, session_results: `${data.response}` };
    });
  });
};
