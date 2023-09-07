import speech from "@google-cloud/speech";

import { evaluateSession } from "./utility.mjs";
import { calculateTimeOut } from "./utility.mjs";
import { processResponse } from "./processTranscription.mjs";

const config = {
  encoding: "WEBM_OPUS",
  sampleRateHertz: 16000,
  languageCode: "en-US",
};

const request = {
  config,
  interimResults: false,
  single_utterance: false,
  enable_spoken_punctuation: false,
  microphone_distance: "NEARFIELD",
};



export function handleStream(socket, cueData) {
  let recognizeStream = null;
  let client;
  let startTime = null;

  ////////////////////////  FUNCTIONS  //////////////////////////

  const speechCallback = async (stream) => {


    let isFinal = stream.results[0].isFinal
    console.log('Is final? ', isFinal)
 

    let words = stream.results[0].alternatives[0].transcript;
    // console.log(words)
    let wordsArray = words.split(" ");

    if (stream.results[0].isFinal === false) {
      // timeOut = calculateTimeOut(startTime, 5)

      // if (timeOut === true) {
      //   console.log('results not final but time is up, processing')
      //   let processedResponse = processResponse(words, cueData.cueLength);

      //   console.log("processedResponse: ", processedResponse);
  
      //   let sessionResult = await evaluateSession(cueData, processedResponse);
  
      //   // console.log(`server sessionResult: ${sessionResult}`);
  
      //   //TOTO: handle chatGPT timeout
      //   // try {
      //   //   let chatGPTAnalysis = await chatGPTData(sessionResult);
      //   //   console.log(`chatGPTAnalysis: ${chatGPTAnalysis.content}`);
      //   //   socket.emit("chatGPT_response", { chatGPTAnalysis });
      //   // } catch (error) {
      //   //   socket.emit("chatGPT_error", "ChatGPT is busy right now");
      //   //   console.log(`chatGPT error: ${error}`);
      //   // }
  
      //   socket.emit("results_processed", sessionResult);
      //   endStream(recognizeStream);
      //   socket.emit("stop_media_recorder");

      // }

    }


      if (stream.results[0].isFinal === true) {
        console.log('HANBURBER')
        socket.emit("stop_media_recorder");
        // socket.emit("processing_results", "true");
        let processedResponse = processResponse(words, cueData.cueLength);
        let sessionResult = await evaluateSession(cueData, processedResponse);
        
        try {
          let chatGPTAnalysis = await chatGPTData(sessionResult);
          console.log(`chatGPTAnalysis: ${chatGPTAnalysis.content}`);
          socket.emit("chatGPT_response", { chatGPTAnalysis });
        } catch (error) {
          socket.emit("chatGPT_error", "ChatGPT is busy right now");
          console.log(`chatGPT error: ${error}`);
        }

        socket.emit("results_processed", {response: sessionResult});
       
      }


      // console.log("processedResponse: ", processedResponse);


      // console.log(`server sessionResult: ${sessionResult}`);

      //TOTO: handle chatGPT timeout


      // console.log(sessionResult)


  };

  const streamCallback = (data) => {
    //check for elapsed time
    let {timeout, elapsedTime} = calculateTimeOut(startTime, 10)

    //if timeUP is true emit stop recorder

    // timeOut && socket.emit("stop_media_recorder", "timeout");
    // console.log('starttime: ', startTime)
    // console.log('elapsed time: ', Math.round(elapsedTime) )
    // console.log('timeout: ', timeout)

    if (timeout) {
      // console.log('time ran out')
      socket.emit("stop_media_recorder", "timeout");

    }



    if (recognizeStream === null) {
      client = new speech.SpeechClient();
      recognizeStream = client
        .streamingRecognize(request)
        .on("error", (err) => {
          if (err.code === 11) {
            console.log(`errorcode 11 ${err}`);
          } else {
            console.error("Speech API request error: " + err.message);
          }
        })
        .on("data", speechCallback);
    }

    if (recognizeStream) {
      // console.log("stream data received attempting to write to recognizeStream: ");
      recognizeStream.write(data);
    }
  };

  const endStream = (recognizeStream) => {
    if (recognizeStream !== null) {
      recognizeStream.end();
      socket.off("stream", streamCallback);
      recognizeStream = null;
      client = null;
      startTime = null;
    }
  };

  ////////////////////////  SOCKET LISTENERS  //////////////////////////

  socket.on("stream", streamCallback);

  //this may not be necc, may be the same as cancel
  socket.on("media_recorder_state", (data) => {
    if (data === "stopped") {
      console.log("media recorder stopped command from client ");
      if (recognizeStream) {
        endStream(recognizeStream);
      } else return
    }
  });

  socket.on("recorder_start", (data) => {
    // console.log('start time? ', data)
    startTime = data;
  })

  socket.on("cancel_session", (data) => {
    endStream();
  });
}
