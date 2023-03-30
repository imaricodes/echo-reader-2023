
import React, { useContext, useState, useEffect, useRef } from "react";

import { io } from "socket.io-client";

import { SessionContext } from "../../contexts/SessionContext";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StartCard from "../StageComponents/StartCard";
import ResultsCard from "../StageComponents/ResultsCard";

const Stage = (props) => {
  
  const [sessionResult, setSessionResult] = useState(null);
  const {sessionState, setSessionState, socket, setSocket} = useContext(SessionContext);
  const value = useContext(SessionContext);
  
  const cueRef = useRef("");
  console.log(`sessionState is ${sessionState}`)


  useEffect(() => {

    if (sessionState === "go") {
      if (!socket) {
        try {
          console.log(`current session state is start, creating socket connection`)
          let sockets = io();
          sockets.on('connection', (data) => { console.log(`connection established`)})
          setSocket(sockets);
         
          
        } catch (error) {
          console.log(`error creating socket connection: ${error}`)
        }
        
      }
    }

    ///////////////////////////// STATE: START /////////////////////////////
    if (sessionState === "start") {
      const getMicAccess = async () => {
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log(`mic access granted`);
        } catch (error) {
          console.log(`mic access denied`);
        }
      }

      getMicAccess();
    }


    ///////////////////////////// STATE: LISTEN /////////////////////////////
    if (sessionState==='listen') {
      console.log('global socket: ',socket)
      if (socket) {
      
        ///////////////////////////// RECORDER VARIABLES /////////////////////////////
  
        const getUserMediaConstraints = {
          audio: {
            channelCount: 1,
            sampleRate: 16000,
          },
          video: false,
        };
  
        const reader = new FileReader();
  
        let base64data;
  
        ///////////////////////////// RECORDER FUNCTIONS /////////////////////////////
        function sendRecorderDataWhenAvailable(e) {
          reader.readAsDataURL(e.data);
          reader.onload = () => {
            base64data = reader.result.split("base64,")[1];
            // console.log(`base64 ${base64data}`)
            socket.emit("incoming_stream", base64data);
          };
        }
  
        async function startRecorder() {
  
          let mediaRecorderOptions = {};
          let mediaRecorder = null;
  
          if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
            mediaRecorderOptions = {mimeType: 'audio/webm; codecs=opus'};
            } else if (MediaRecorder.isTypeSupported('video/mp4')) {
              mediaRecorderOptions = {mimeType: 'video/mp4'};
          }
  
          try {
            console.log("starting recorder");
            await navigator.mediaDevices
              .getUserMedia(getUserMediaConstraints)
              .then((stream) => {
                if (mediaRecorder === null) {
                  mediaRecorder = new MediaRecorder(
                    stream,
                    mediaRecorderOptions
                    );

                    mediaRecorder.start(250)
                } else { mediaRecorder.start(250)}

  
                mediaRecorder.ondataavailable = sendRecorderDataWhenAvailable;
                
                socket.on("close_media_recorder", (data) => {
                  console.log(`close media recorder message received ${data}`);
                  mediaRecorder.stop();
                  console.log(`media recorder stopped`);
                //TODO: KEEP MEDIA RECORDER OPEN UNTIL SESSION IS CANCELLED OR COMPLETED
                  // mediaRecorder = null;
                  console.log(`media recorder: ${mediaRecorder}`);
                });
  
              });
          } catch (error) {
            console.log("navigator error:", error.message);
          }
        }
  
        ///////////////////////// SOCKET LISTENERS /////////////////////////
        socket.on("results_processed", (data) => {
          console.log("speech results received from server: ", data);
  
          //here, update sessionState
          setSessionResult(data);
          setSessionState("restart");
          //TODO: DO NOT DISCONNECT SOCKET HERE 
          socket.disconnect();
          setSocket(null)
          });
  
        //start recorder
        startRecorder();
      }
    }


    ///////////////////////////// STATE: CANCEL /////////////////////////////
    if (sessionState === "cancel") {
      if(socket) {
        socket.emit('cancel_session')
      }
    }
  }, [sessionState]);



  const COMPONENT_STATES = {
    go: <StartCard />,
    start: <CueSentenceCard/>,
    listen: <CueSentenceCard/>,
    results: <ResultsCard sessionResult={sessionResult} />,
    restart: <ResultsCard sessionResult={sessionResult} />,
    cancel: <StartCard />,
  };
  console.log(`session state: ${sessionState}`)
  return (
    <div className="stage stage--height">
      {COMPONENT_STATES[sessionState]}
    </div>
    
    );
};

export default Stage;
