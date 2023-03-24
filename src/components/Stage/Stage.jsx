
import React, { useContext, useState, useEffect, useRef } from "react";

import { io } from "socket.io-client";
import { processCue } from "../../js/processCue";
import { SessionContext } from "../../contexts/SessionContext";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StartCard from "../StageComponents/StartCard";
import ResultsCard from "../StageComponents/ResultsCard";

const Stage = (props) => {
  
  const CUE_PHRASES = [
    "The truth hurts my feet.",
    "Those are beautiful shoes.",
    "I want candy.",
    "More people eat chicken now.",
    "Salamanders are slimy creatuers.",
    "Nobody likes rotten candy.",
    "Math is fun.",
    "A sunny day is a great day.",
    "I like peanuts in my cereal.",
  ];

  const [sessionResult, setSessionResult] = useState(null);
  const [sessionState, setSessionState] = useContext(SessionContext);
  const [socketState, setSocketState] = useState(null);
  const cueRef = useRef("");


  //this effect selects a random cue and stores as cueRef
  useEffect(() => {

    if (sessionState === "go") {
      let selectedCue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];

      cueRef.current = selectedCue;
      console.log(`cueRef ${cueRef.current}`);
    }
  }, [sessionState]);


  useEffect(() => {

    //if current session state is listen, create socket connection
    if (sessionState === "listen") {
      console.log(`current session state is listen, creating socket connection`)
      const socket = io();

      //confirm connection
      socket.on('connection', (data) => { console.log(`connection established`)})

      setSocketState(socket);
    }

    if (sessionState === "cancel") {
      if(socketState) {
        socketState.emit('cancel_session')
      }
    }
  }, [sessionState]);


  //run this effect when socketState !null
  useEffect(() => {
    if (socketState) {
      console.log(`current socketState ${socketState}`);
      //send cue data to server
      console.log('sending cue data to server')
      let processedCue = processCue(cueRef.current);
      socketState.emit("send_cueData", processedCue);


      ///////////////////////////// RECORDER VARIABLES /////////////////////////////

      let mimeType;

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
          socketState.emit("incoming_stream", base64data);
        };
      }

      async function startRecorder() {

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
              let mediaRecorder = new MediaRecorder(
                stream,
                mediaRecorderOptions
              ); //pass in options

              if (mediaRecorder) {
                mediaRecorder.start(250);
              }

              mediaRecorder.ondataavailable = sendRecorderDataWhenAvailable;

              socketState.on("close_media_recorder", (data) => {
                console.log(`close media recorder message received ${data}`);
                mediaRecorder.stop();
                console.log(`media recorder stopped`);
                mediaRecorder = null;
                console.log(`media recorder: ${mediaRecorder}`);
              });

            });
        } catch (error) {
          console.log("navigator error:", error.message);
        }
      }

      ///////////////////////// SOCKET LISTENERS /////////////////////////
      socketState.on("results_processed", (data) => {
        console.log("speech results received from server: ", data);

        //here, update sessionState
        setSessionResult(data);
        setSessionState("results");

        socketState.disconnect();
        setSocketState(null)
      });

      //start recorder
      startRecorder();

    }
  }, [socketState]);


  const COMPONENT_STATES = {
    go: <StartCard />,
    start: <CueSentenceCard cue={cueRef.current} />,
    listen: <CueSentenceCard cue={cueRef.current} />,
    results: <ResultsCard sessionResult={sessionResult} />,
    restart: <ResultsCard sessionResult={sessionResult} />,
    cancel: <StartCard />,
  };

  return (
    <div className="stage stage--height">
      {COMPONENT_STATES[sessionState]}
    </div>
    
    );
};

export default Stage;
