import React, { useRef, useEffect, useContext, useState } from "react";
import { processCue } from "../../js/processCue";
import { SessionContext } from "../../contexts/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import CountdownTimer from "../CountdownTimer";
import DotAnimation from "../../DotAnimation";

const CueSentenceCard = (props) => {
  console.log("rendering CueSentenceCard now");

  // console.log('use countdown: ', useCountdown)
  const CUE_PHRASES = [
    "The cat sat on me.",
    "I love to play at parks.",
    "The sun is very hot.",
    "Dogs like to chase squirrels.",
    "She ran very fast today.",
    "He always picks pizza.",
    "I saw a bird fly.",
    "The flowers are so pretty.",
    "My cat sleeps hard.",
    "We are best friends.",
    "I feel happy and excited.",
    "The sky is beautiful.",
    "I want to go swimming.",
    "John has a toy car.",
    "The beach is very sandy.",
  ];

  const { sessionState, setSessionState, socket } = useContext(SessionContext);

  const cueRef = useRef(null);
  const micIconRef = useRef(null);
  const micIconPulseRef = useRef(null);
  const [cueSentence, setCueSentence] = useState(null);

  const selectRandomCue = () => {
    console.log("running selectRandomCue()");

    if (localStorage.getItem("cue") === null) {
      let selectedCue =
        CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
      console.log("selectedCueBall: ", selectedCue);
      cueRef.current.innerText = selectedCue;
      //set cue in local storage
      localStorage.setItem("cue", selectedCue);

      //send cue data to server
      console.log("sending cue data to server");
      let processedCue = processCue(selectedCue);
      console.log("processedCue: ", processedCue);
      socket.emit("send_cueData", processedCue);
      return selectedCue;
    }

    if (
      localStorage.getItem("cue") === cueSentence ||
      localStorage.getItem("cue") === null
    ) {
      let selectedCue =
        CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
      console.log("selectedCueBall: ", selectedCue);
      cueRef.current.innerText = selectedCue;
      //set cue in local storage
      localStorage.setItem("cue", selectedCue);

      //send cue data to server
      console.log("sending cue data to server");
      let processedCue = processCue(selectedCue);
      console.log("processedCue: ", processedCue);
      socket.emit("send_cueData", processedCue);
      return selectedCue;
    }
  };

  useEffect(() => {
    if (sessionState === "start") {
      setCueSentence(selectRandomCue());
    }
  }, [sessionState]);

  useEffect(() => {
    if (localStorage.getItem("cue") !== null) {
      cueRef.current.innerText = localStorage.getItem("cue");
    }
  });

  // turn mic icon recording indicator on and off
  useEffect(() => {
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

  return (
    <div className="card card__stage card__display--flex-column  card__stage--text lg:width[500px] relative">
      <div className="absolute top-0 flex w-full px-10 pt-4">
        {/* TODO: what happens when the countdown is done? */}
        {/* countdown timer */}
        {/* <CountdownTimer /> */}

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
      </div>
      <div className=" w-full text-center " ref={cueRef}>
        {cueSentence}
      </div>
    </div>
  );
};

export default CueSentenceCard;
