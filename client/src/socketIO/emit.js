//events from client to server
//setup corresponding 'on' listener on server

import { socket } from "./socket-service";

export const cue_data = (data) => {
  console.log("cue_data emitted");
  socket.emit("cue_data", data);
};

export const handleStream = () => {
  socket.emit("handle_stream")
}
