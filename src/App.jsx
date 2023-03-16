import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { io } from "socket.io-client";

function App() {
  const [count, setCount] = useState(0)

  const messageRef = useRef()

  const handleClick = () => { 
    console.log('click')
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        messageRef.current.innerHTML =  `THIS CAME FROM SERVER: ${data.message} `
      
      }
        
      )
  }

  const startSocket = () => {
    const socket = io();
    console.log(socket)
    socket.once('connection', (data) => {
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
              socket.once("close_media_recorder", (data) => {
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

      socket.once("results_processed", (data) => {
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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleClick}>
          get that data
        </button>
        <div ref={messageRef}></div>
        <button onClick={startSocket}>
          check google speech
        </button>
        <p>
          Hello dude
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
