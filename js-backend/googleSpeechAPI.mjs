import { processResponse } from "./processTranscription.mjs";
import {evaluateSession} from './utility.mjs';


// Imports the Google Cloud client library
import speech from "@google-cloud/speech";
const client = new speech.SpeechClient();


const config = {
  encoding: "WEBM_OPUS",
  sampleRateHertz: 16000,
  languageCode: "en-US",
};

const request = {
  config,
  interimResults: true,
};

let recognizeStream;


//////////////////////////  EXPORTS  //////////////////////////


export function handleStream (socket) {

  let cueData = {};

    const speechCallback = (stream) => {
        //TODO: set timeout in case final transcript does not arrive
        console.log("SPEECH CALLBACK CALLED");
        let words = stream.results[0].alternatives[0].transcript;
        let wordsArray = words.split(" ");
        console.log(`wordsArray: ${wordsArray}`);
    
        if (stream.results[0].isFinal === true) {
          //TODO: where in this process do I close the api connection?
          console.log('closing speech api...')
          recognizeStream.end()
          recognizeStream.removeListener('data', speechCallback);
          recognizeStream = null;
          socket.emit("close_media_recorder", "close_media_recorder")

          let processedResponse = processResponse(words, cueData.cueLength);

          console.log(`processedResult evaluate ${processedResponse.evaluate}`);
          console.log(`processedResult display ${processedResponse.display}`);
    
          //evaluate cue, response and return session result object
    
          let sessionResult = evaluateSession(cueData, processedResponse);
    
          socket.emit("results_processed", sessionResult);
    
        }
      };


    recognizeStream = client
    .streamingRecognize(request)
    .on("error", (err) => {
      if (err.code === 11) {
        console.log(`errorcode 11 ${err}`);
      } else {
        console.error("API request error " + err.message);
      }
    })
    .on("data", speechCallback);

  //////////////////////////  SOCKET LISTENERS  //////////////////////////

  socket.on("send_cueData", (data) => {
    console.log(`cueData received: `, data);
    cueData = { ...data };
    console.log(`cueData spread ${cueData.display}`);
  });

  socket.on("incoming_stream", (audio) => {
    // console.log(`stream coming`)
    // console.log('recognize stream: ', recognizeStream)
    if (recognizeStream) {
    //   console.log(audio)
      recognizeStream.write(audio);
    } else console.log('no recognize stream')
    
  });

  socket.on("cancel_session", (data)=> {
    console.log(`say cheese: ${data}`)
    console.log('closing speech api...')
      if(recognizeStream) {
        recognizeStream.end()
      recognizeStream.removeListener('data', speechCallback);
      recognizeStream = null;
      }
      
      socket.emit("close_media_recorder", "close_media_recorder")
  })
}

  


