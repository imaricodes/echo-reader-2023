import { processResponse } from "./processTranscription.mjs";
import {evaluateSession} from './utility.mjs';
import { chatGPTData } from "./ChatGPT.mjs";


// Imports the Google Cloud client library
import speech from "@google-cloud/speech";
const client = new speech.SpeechClient();

//called RecognitionConfig in google docs
const config = {
  encoding: "WEBM_OPUS",
  sampleRateHertz: 16000,
  languageCode: "en-US",
};

const request = {
  config,
  interimResults: true,
  single_utterance: false,
  enable_spoken_punctuation: false,
  microphone_distance: "NEARFIELD",
  // interaction_type: "DICTATION",
  // enable_voice_activity_events: true, //wait for speech acitivity to start
};

let recognizeStream = null;
let isListening = false;


//////////////////////////  EXPORTS  //////////////////////////


export function handleStream (socket, cueData, audio) {

  // let cueData = cueData;
  let streamingTranscriptionResults = false;
  const endSession = () => {
    console.log('session ended closing speech api...')
    if(recognizeStream) {
      recognizeStream.end();
      recognizeStream.destroy();
      recognizeStream = null;
      socket.emit("close_media_recorder", "close_media_recorder")
    }
  }

  const speechCallback = async (stream) => {
      //TODO: set timeout in case final transcript does not arrive
      console.log("SPEECH CALLBACK CALLED");
      // console.log(`stream state: ${stream.results[0].isFinal}`);
      // console.log(`stream interim: ${stream.results[0].tanscript}`);
      if (stream.results[0].isFinal === false) {
        socket.emit("google_speech_listening", "listening")
      }

      let words = stream.results[0].alternatives[0].transcript;
      let wordsArray = words.split(" ");
      console.log(`wordsArray: ${wordsArray}`);
      console.log('isFinal state: ', stream.results[0].isFinal)

      if (stream.results[0].isFinal === false && streamingTranscriptionResults === false) {
        streamingTranscriptionResults = true;

      }

      if (stream === undefined) {
        console.log('stream undefined')
      } else console.log('stream defined')
  
      if (stream.results[0].isFinal === true) {
        socket.emit("processing_results", "processing results")
        endSession()

        let processedResponse = processResponse(words, cueData.cueLength);

        // console.log(`processedResult evaluate ${processedResponse.evaluate}`);
        // console.log(`processedResult display ${processedResponse.display}`);
  
        //evaluate cue, response and return session result object
  
        let sessionResult = await evaluateSession(cueData, processedResponse);
        console.log(`server sessionResult: ${sessionResult}`);

        //TOTO: handle chatGPT timeout
        try {
          let chatGPTAnalysis = await chatGPTData(sessionResult);
          console.log(`chatGPTAnalysis: ${chatGPTAnalysis.content}`);
          socket.emit("chatGPT_response", {chatGPTAnalysis});
          
        } catch (error) {
          socket.emit("chatGPT_error", "ChatGPT is busy right now")
          console.log(`chatGPT error: ${error}`)
        }
      

        // chatGPTData().then(data => { 
            //this is the response from the GPT-3 API
            //emit it to the client
        // });
  
        
        socket.emit("results_processed", sessionResult);

        //also emit openai response here?
  
      }
    };

  console.log('handle stream called')

  if (recognizeStream === null) {
    console.log('stream null making new stream')
    recognizeStream = client
    .streamingRecognize(request)
    .on("error", (err) => {
      if (err.code === 11) {
        console.log(`errorcode 11 ${err}`);
      } else {
        console.error("API request error in if block " + err.message);
      }
    })
    .on("data", speechCallback);
  } else console.log('recognizeStream is not null')


  if (recognizeStream) {
    // console.log(audio)
    console.log('audio received attempting to write to recognizeStream: ')
    recognizeStream.write(audio);
  } else console.log('no recognize stream: ')

  //////////////////////////  SOCKET LISTENERS  //////////////////////////

  socket.on("cancel_session", (data)=> {
    console.log('closing speech api...', data)
    endSession();

  })
}



