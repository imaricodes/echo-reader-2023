import { evaluateSession } from "./utility.mjs";
import { processResponse } from "./processTranscription.mjs";
import { chatGPTData } from "./ChatGPT.mjs";


export const  speechCallback = async (stream) => {
    //TODO: set timeout in case final transcript does not arrive
    console.log("SPEECH CALLBACK CALLED");
  
    if (stream.results[0].isFinal === false) {
      socket.emit("google_speech_receiving", "true");
    }

    let words = stream.results[0].alternatives[0].transcript;
    let wordsArray = words.split(" ");
    console.log(`wordsArray: ${wordsArray}`);
    console.log("isFinal state: ", stream.results[0].isFinal);

    if (
      stream.results[0].isFinal === false &&
      streamingTranscriptionResults === false
    ) {
      streamingTranscriptionResults = true;
    }

    if (stream === undefined) {
      console.log("stream undefined");
    } else console.log("stream defined");

    if (stream.results[0].isFinal === true) {
      socket.emit("processing_results", "processing results");
      endSession();

      let processedResponse = processResponse(words, cueData.cueLength);

      let sessionResult = await evaluateSession(cueData, processedResponse);
      
      console.log(`server sessionResult: ${sessionResult}`);

      //TOTO: handle chatGPT timeout
      try {
        let chatGPTAnalysis = await chatGPTData(sessionResult);
        console.log(`chatGPTAnalysis: ${chatGPTAnalysis.content}`);
        socket.emit("chatGPT_response", { chatGPTAnalysis });
      } catch (error) {
        socket.emit("chatGPT_error", "ChatGPT is busy right now");
        console.log(`chatGPT error: ${error}`);
      }

      socket.emit("results_processed", sessionResult);

      //also emit openai response here?
    }
  };