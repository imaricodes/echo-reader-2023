
import React, { useContext, useState, useEffect, useRef } from "react";

import { io } from "socket.io-client";

import { SessionContext } from "../../contexts/SessionContext";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StartCard from "../StageComponents/StartCard";
import ResultsCard from "../StageComponents/ResultsCard";
import TimeUpCard from "../StageComponents/TimeUpCard";

const Stage = () => {

  const [sessionResult, setSessionResult] = useState(null);
  const {sessionState, setSessionState, socket, setSocket, socketIsConnected} = useContext(SessionContext);
  const value = useContext(SessionContext);
  const mediaRecorderStart = useRef(0);

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
        //TODO: only request mic access if user has not already granted it
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          // console.log(`mic access granted`);
        } catch (error) {
          console.log(`mic access denied`);
        }
      }

      getMicAccess();
    }


    //TODO: If in any state other than listen and if media recorder is !null, stop it. There is an issue where the audio stream is not being stopped when the session results have been received from the server. This is causing an error to be thrown by th google speech api because it is tryting to write to a stream that has already been closed/destroyed.

    ///////////////////////////// STATE: LISTEN /////////////////////////////
    if (sessionState==='listen') {
      console.log('current session state is listen, run media recorder')
      // console.log('global socket: ',socket)
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

        //start new listening session = null media recorder
        let mediaRecorder = null;

        ///////////////////////////// RECORDER FUNCTIONS /////////////////////////////
        function sendRecorderDataWhenAvailable(e) {
          if(mediaRecorder.state !=='inactive'){
            reader.readAsDataURL(e.data);
            reader.onload = () => {
              base64data = reader.result.split("base64,")[1];
              // console.log(`base64 ${base64data}`)
              console.log('sending data to server')
              socket.emit("incoming_stream", base64data);
            }; 
          } else {console.log('media recorder is inactive, not sending data to server')}
        }

        async function startRecorder() {
          console.log('media recorder start = ', mediaRecorderStart.current ++)
          let mediaRecorderOptions = {};

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
                    
                  } else if (mediaRecorder.state === "inactive") {
                    console.log(`media recorder state changed: ${mediaRecorder.state}`);
                    // mediaRecorder.start(250)
                  }

                mediaRecorder.ondataavailable = sendRecorderDataWhenAvailable;

                socket.on("close_media_recorder", (data) => {
                  console.log(`close media recorder message received ${data}`);

                  if (mediaRecorder.state !== "inactive") {
                  mediaRecorder.stop();
                  console.log(`media recorder state changed: ${mediaRecorder.state}`);
                  }
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
          setSessionState("results");
          });
        //start recorder
        //ISSUE: Is this causing the server to fun endSession repeatedly? This is being called twice (?) once when the session state changes to listen and again when the socket connection is established. This is causing the media recorder to be started twice, which is causing the audio stream to be sent twice to the server. 
        startRecorder();
      }
    }

  }, [sessionState]);



  const COMPONENT_STATES = {
    go: <StartCard />,
    start: <CueSentenceCard/>,
    listen: <CueSentenceCard/>,
    results: <ResultsCard sessionResult={sessionResult} />,
    // restart: <ResultsCard sessionResult={sessionResult} />,
    cancel: <StartCard />,
    timeUp: <TimeUpCard />
  };

  console.log(`session state: ${sessionState}`)

  return (
    <div className="stage stage--height lg:mb-0 lg:h-[300px] ">
      {COMPONENT_STATES[sessionState]}
    </div>
    );
};

export default Stage;
