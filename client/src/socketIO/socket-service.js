import io from "socket.io-client";
import { socketEvents } from "./events";


// export const socket = io({autoConnect: false});

export const socket = io("http://localhost:3000", { autoConnect: false });



export const initSockets = ({ setValue }) => {
  //anytime an event is received on client from the server socket, the state of the socket provider will be updated
  //this strategy prevents the component from re-rendering on every socket event when the state is updated
  socketEvents({ setValue });
};


