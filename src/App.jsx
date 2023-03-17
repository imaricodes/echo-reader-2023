import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { io } from "socket.io-client";

import Header from "./components/Header";
import MainContainer from "./components/MainContainer/MainContainer";


function App() {


  const messageRef = useRef()

  // const handleClick = () => { 
  //   console.log('click')
  //   fetch('/api')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       messageRef.current.innerHTML =  `THIS CAME FROM SERVER: ${data.message} `
      
  //     }
        
  //     )
  // }

  const startRecorder = () => {
    const socket = io();
    console.log(socket)
    socket.on('connection', (data) => {
      console.log(`message from server: ${data}`)
       console.log(`connection established`)
       socket.emit('message', 'hello from client')
      });


      // ***** CODE FOR RECORDER ***** //

      const getUserMediaConstraints = {
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        },
        video: false,
      };

      const mediaRecorderOptions = {
        mimeType: "audio/webm; codecs=opus",
      };

      const reader = new FileReader();

      let base64data;

      function sendRecorderDataWhenAvailable(e) {
        reader.readAsDataURL(e.data);
        reader.onload = () => {
          base64data = reader.result.split("base64,")[1];
          console.log(`base64 ${base64data}`)
          socket.emit("incoming_stream", base64data);
        };
      }

      async function startRecorder() {
        try {
          console.log("starting recorder");
          await navigator.mediaDevices
            .getUserMedia(getUserMediaConstraints)

            // let track = stream.getAudioTracks()[0];
            // console.log(track.getCapabilities());
            .then((stream) => {
              let mediaRecorder = new MediaRecorder(
                stream,
                mediaRecorderOptions
              ); //pass in options

              if (mediaRecorder) {
                mediaRecorder.start(250);
              }

              mediaRecorder.ondataavailable = sendRecorderDataWhenAvailable;

              //temporarily disabled for testing
              socket.on("close_media_recorder", (data) => {
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

      startRecorder();

      socket.on("results_processed", (data) => {
        console.log("speech results received from server: ", data);

        //here, update sessionState
        // setSessionResult(data);
        // setSessionState("results");

        socket.disconnect();
        // setSocket(null)
      });

  }



  return (
    <div className="App">
        <Header />
      <MainContainer />
    </div>
  )
}

export default App
