import {useEffect, useState } from "react";
import { socket } from "../../socketIO/socket-service";

const GPTResponse = () => {
  const [sessionResults, setSessionResults] = useState(() => {
    if (localStorage.getItem("session_results") !== null) {
      const value = localStorage.getItem("session_results");
      const jsonArray = JSON.parse(value);
      return jsonArray;
    } else {
      console.log("no results");
      return null;
    }
  });

  const [GPTFeedback, setGPTFeedback] = useState(null);

  useEffect(() => {
    if (sessionResults) {
      socket.on("chatGPT_result", (data) => {
        console.log("chat gpt response: ", data);
        setGPTFeedback(data)
      });

      socket.on("chatGPT_error", (data) => {
        console.log(data);
      });
    }

    return () => {
      //TODO: remove socket listener
    };
  }, [sessionResults]);
  return <div>GPT response

    {GPTFeedback ? <GPTFeedback /> : <div> <p>Waiting for gpt resonse...</p></div>}
  </div>;
};

export default GPTResponse;
