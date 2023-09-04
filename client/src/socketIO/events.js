//events.js listens for events emitted from the server:

import { socket } from "./socket-service";

let count=1;
let sum;



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
    console.log('prev count: ', count)
    count  += 1
    console.log('current count ', count)
    
    // console.log('result as object')
    // console.log(data.response)
    
    setValue((state) => {
      return { ...state, session_results: `${data.response}` };
    });
  });

  socket.on("chatGPT_response", (data) => {
    // console.log('chatGPT_response server side: ', data)
    setValue((state) => {
      return { ...state, chatGPT_response: `${data}` };
    });
  });

  socket.on("chatGPT_error", (data) => {
    setValue((state) => {
      return { ...state, chatGPT_error: `${data}` };
    });
  });

};

