import { useRef, useContext, useEffect, useState } from "react";
import Card from "../UI/Card";
// import { SessionContext } from "../../contexts/SessionContext";
import { socket } from "../../socketIO/socket-service";
// import { useStorage } from "../../hooks/useStorage";
import GPTResponse from "./GPTResponse";

const ResponseAnalysis = () => {
  // const {sessionState, socket, setSocket} = useContext(SessionContext);
  const [analysis, setAnalysis] = useState(null);
  const [sessionResults, setSessionResults] = useState(() => {
    if (localStorage.getItem("session_results") !== null) {

      const value = localStorage.getItem("session_results");

      const jsonArray = JSON.parse(value);

      const finalObject = {
        cueSentence: jsonArray[0],
        responnseSentence: jsonArray[1]
      }

      // let [firstArray, secondArray] = jsonArray;

      // let firstObject = Object.assign({}, firstArray);
      // let secondObject = Object.assign({}, secondArray);

   

      // console.log(finalObject)

      // console.log("get from storage: ", jsonArray);
      // console.log("get from storage typeof: ", Array.isArray(jsonArray));

      // let parsed = JSON.parse(value)

      // console.log('parsed: ', value)
      // console.log('parsed typeof: ',typeof value)
      return jsonArray;
    } else {
      console.log("no results");
      return null;
    }
  });

  const [isRequestingGPTAnalysis, setIsRequestingGPTAnalysis] =useState(false)
  const analysisRef = useRef();
  const analysisButttonRef = useRef();

  //onload use effect
  //check for local storage
  //if local storage, get it and fetch gpt response
  //on response set analysis or on error, set inner  html



  const getGPTAnalysis = () => {
    socket.emit("fetch_gpt", sessionResults);
  };

  // useEffect(() => {
  //     //TODO: handle if chatgpt throws error
  //     if (socket) {
  //       socket.on('chatGPT_response', (data) => {
  //         console.log(`chatGPT_response:`, data.chatGPTAnalysis.content);
  //         setAnalysis(data.chatGPTAnalysis.content);
  //       })

  //       socket.on('chatGPT_error', (data) => {
  //         setAnalysis(data)
  //       })
  //     }

  //TODO: remove listenter on unmount
  // return () => {

  // }
  // }, [])

  // useEffect(() => {
  //   //clear analysis if sessionState is not 'go'
  //   //show button if sessionState is 'go'
  //     if ( analysis !== null) {
  //         setAnalysis(null)
  //         analysisRef.current.innerHTML = '';
  //         analysisButttonRef.current.classList.remove('hidden')
  //     }
  // }, [analysis])

  // const getAnalysis = () => {
  //     if (analysis) {
  //         analysisRef.current.innerHTML = analysis;
  //         analysisButttonRef.current.classList.add('hidden')
  //       }
  // }

  return (
    <Card>
      <div className="flex flex-col items-center">
      <h1 className="mb-6 text-center font-bold text-lg">
        How to Read Results
      </h1>
      <div className="grid grid-cols-analysis-grid grid-rows-analysis-grid gap-x-3 gap-y-1 mb-10 text-lg">
        <div>
          <span className="inline-block bg-green-600 w-10 h-5 rounded-lg shadow" />
        </div>
        <div>
          <p>Right word, right place</p>
        </div>
        <div>
          <span className="inline-block bg-yellow-400 w-10 h-5 rounded-lg shadow" />
        </div>
        <div>
          <p>Right word, wrong place</p>
        </div>
        <div>
          <span className="inline-block bg-red-600 w-10 h-5 rounded-lg shadow" />
        </div>
        <div>
          <p>Word not in sentence</p>
        </div>
      </div>
      <button
        ref={analysisButttonRef}
        disabled ={isRequestingGPTAnalysis}
        className="btn bg-green-500"
        onClick={()=> setIsRequestingGPTAnalysis(true)}
      >
        Ask ChatGPT for Feedback
      </button>
      <div ref={analysisRef} className="text-lg"></div>
      {isRequestingGPTAnalysis ? <GPTResponse />: null}
    </div>

    </Card>
    

  );
};

export default ResponseAnalysis;
