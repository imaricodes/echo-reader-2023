import React, { useRef, useEffect, useContext, useState } from "react";
import { processCue } from "../../js/processCue";
import { SessionContext } from "../../contexts/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import DotAnimation from "../../DotAnimation";

const CueSentenceCard = (props) => {

  // console.log('use countdown: ', useCountdown)
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

  const { sessionState, setSessionState, socket } = useContext(SessionContext);

  const cueRef = useRef(null);
  const micIconRef = useRef(null);
  const micIconPulseRef = useRef(null);
  const refreshIconRef = useRef(null);
  const cueHistoryRef = useRef([]);

  const [cueSentence, setCueSentence] = useState(null);

  const selectRandomCue = () => {

    const fetchCueSentence = () => {
      let result = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
      return result
    }

    const selectCue = () => {


      if (!cueHistoryRef.current.length || cueHistoryRef.current.length === 0 ) {
        let cue = fetchCueSentence()
        cueHistoryRef.current.push(cue)
        localStorage.setItem('cue', cue)
        // let processedCue = processCue(cue);
        // console.log("processedCue: ", processedCue);
        // socket.emit("send_cueData", processedCue);
        setCueSentence(cue)
        return cue
      }

      if (cueHistoryRef.current.length > 0) {
        let cue = fetchCueSentence()

        //check if cue is already in stack
        if (cueHistoryRef.current.includes(cue)) {

          //check if all cues used
          if (cueHistoryRef.current.length === CUE_PHRASES.length) {
            //clear the cue history
            cueHistoryRef.current = []
          } else selectCue()
        }

        if (!cueHistoryRef.current.includes(cue)) {
          cueHistoryRef.current.push(cue)
          localStorage.setItem('cue', cue)
          // let processedCue = processCue(cue);
          // console.log("processedCue: ", processedCue);
          // socket.emit("send_cueData", processedCue);
          setCueSentence(cue)
          return cue
        }
      }

    };

    let selectedCue = selectCue();

    // cueRef.current.innerText = localStorage.getItem('cue');
    let processedCue = processCue(selectedCue);
    socket.emit("send_cueData", processedCue);

    return selectedCue;
  };

  useEffect(() => {
    if (sessionState === "start") {

      if (localStorage.getItem("cue") !==null) {
        let cue = localStorage.getItem("cue");
         let processedCue = processCue(cue);
          socket.emit("send_cueData", processedCue);
        setCueSentence(cue)
      } else  selectRandomCue()
    }
  }, [sessionState]);

  // turn mic icon recording indicator on and off
  useEffect(() => {
    sessionState === "listen"
      ? refreshIconRef.current.classList.add("hidden")
      : refreshIconRef.current.classList.remove("hidden");

    if (sessionState === "listen") {
      micIconRef.current.classList.remove("bg-gray-200");
      micIconRef.current.classList.add("bg-red-600");
      micIconPulseRef.current.classList.remove("hidden");
    } else if (micIconRef.current.classList.contains("bg-red-600")) {
      micIconRef.current.classList.remove("bg-red-600");
      micIconRef.current.classList.add("bg-gray-200");
      micIconPulseRef.current.classList.add("hidden");
    }
  }, [sessionState]);

  const handleCueRefresh = () => {
    selectRandomCue();
  };

  return (
    <div className="card card__stage card__display--flex-column  card__stage--text lg:width[500px] relative">
      <div className="absolute top-0 flex w-full px-10 pt-4">
        <DotAnimation />

        {/* microphone*/}
        <div className="mx-auto flex">
          <span
            ref={micIconRef}
            className="z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 "
          >
            <FontAwesomeIcon
              icon={faMicrophone}
              className="h-[45%]  text-white"
            />
          </span>
          <span
            ref={micIconPulseRef}
            className="absolute hidden h-10 w-10 animate-pulse-fade-grow  rounded-full bg-red-600 "
          />
        </div>

        {/* refresh icon */}
        <span ref={refreshIconRef} className="">
          <button className="cursor-pointer" onClick={handleCueRefresh}>
            <FontAwesomeIcon icon={faRotate} className="h-6 text-orange-400" />
          </button>
        </span>
      </div>
      <div className=" w-full text-center " ref={cueRef}>
        {cueSentence}
      </div>
    </div>
  );
};

export default CueSentenceCard;
