import { socket } from "./socket-service";

export const send_cue_data = (data) => {
  socket.emit("cue_data", data);
};

export const start_handleStream = () => {
  socket.emit("handle_stream")
}
