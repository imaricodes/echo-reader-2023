import { useContext, useEffect, useRef } from "react";

//Contexts
import SocketContext from "../../socketIO/socketContext";

//Components
import CueCardControls from "./CueCardControls";

//Web Sockets
import { socket } from "../../socketIO/socket-service";
import * as emitSocket from "../../socketIO/emit";

//Hooks
import { useLocalStorage } from "../../hooks/useStorage";
import { processCue } from "../../js/processCue";

const CueCard = ({ setStageState }) => {
  //Data
  const CUE_PHRASES = [
    "The cat sat on a sofa.",
    "Fantastic stories are amazing.",
    "The stove is burning hot.",
    "Dogs like to chase squirrels.",
    "She ran very fast today.",
    "He always picks pizza.",
    "A bird soars through clouds.",
    "The flowers are so pretty.",
    "My cat sleeps over there.",
    "We are not best friends.",
    "I feel happy and excited.",
    "The sky is beautiful.",
    "I love to swim.",
    "John has a toy car.",
    "The beach is very sandy.",
    "The dog barks loudly.",
    "She runs fast.",
    "He goes to play at the park.",
    "The sun shines so bright.",
    "I want to play cards.",
    "She dances on stage.",
    "The cat sleeps all day.",
    "He jumps over hurdles.",
    "The flower smells sweet.",
    "She sings soprano today.",
    "He climbs up the mountain.",
    "The bird flies gracefully.",
    "Fish swim in the pond.",
    "She reads books quietly.",
    "He paints colorful pictures.",
  ];

  //Refs
  const socketEventListenerAdded = useRef(false);

  //States, Context, Hooks
  const [sessionResults, setSessionResults, removeSessionResults] =
    useLocalStorage("session_results", null);
  const [cueSentence, setCueSentence] = useLocalStorage("cue_sentence", null);
  const { socket_connected } = useContext(SocketContext);

  //Functions, Handlers
  const getRandomCueSentence = async () => {
    return new Promise((resolve, reject) => {
      const randomIndex = Math.floor(Math.random() * CUE_PHRASES.length);
      const result = CUE_PHRASES[randomIndex];
      resolve(result);
    });
  };

  const handleResultsProcessed = (data) => {
    setSessionResults(data.response);
  };

  //Effects

  useEffect(() => {
    if (sessionResults) {
      removeSessionResults();
    }
    if (socket_connected) {
      console.log("socket connected!!!!!");

      if (!socketEventListenerAdded.current) {
        socket.on("results_processed", handleResultsProcessed);
        socketEventListenerAdded.current - true;
      }
    }
    return () => {
      socket.off("results_processed", handleResultsProcessed);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRandomCueSentence();

        if (result !== cueSentence) {
          setCueSentence(result);
          let processedCue = processCue(result);
          emitSocket.send_cue_data(processedCue);
          emitSocket.start_handleStream();
        } else return;
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <CueCardControls />
      <div className="h-full flex justify-center items-center  top-0 w-full">
        <p>{cueSentence ? cueSentence : "Loading sentence..."}</p>
      </div>
    </>
  );
};

export default CueCard;
