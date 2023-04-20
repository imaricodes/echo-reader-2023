import React from "react";
import Instruction from "./Instruction";

// import goScreenComputerNoFrame from "../../assets/go-screen-no-frame.png";

import WarningModal from "../../assets/instructions-warning-modal.png";
import GoScreen from "../../assets/instructions-go-screen.png";
import HomeScreen from "../../assets/instructions-home-start-screen.png";
// import HomeScreen from "../../assets/instructions-go-screen.png";




const Instructions = () => {
  const instructionText = [
    "Before you can start reading aloud to Echo Reader, please allow microphone access.",
    " If you are not using Chrome or Firefox on a laptop or desktop computer, you may see a warning the first time you load a sentence.",
    "Click 'Go' to get your first reading sentence.",
  ];

  const instructionsText = {
    0: <span>Before you can reading aloud to <bold style={{color: "red", fontWeight:"bold"}}>Echo Reader</bold>, please allow microphone access.</span>,
    1: <span>
      Click <bold style={{color: "green", fontWeight:"bold"}}>Go</bold> to load your first reading sentence.
    </span>,
    2: <span>
      You may be asked to give your Echo Reader permission to access your microphone. Echo Reader will not store any of your audio and only listens while you are reading.
    </span>,
    3: <span>
      After clicking <bold style={{color: "green", fontWeight:"bold"}}>Go</bold>, you will see a new sentence. Take a moment to practice reading the sentence silently or aloud. Echo Reader will start listening when you click <bold style={{color: "green", fontWeight:"bold"}}>Start</bold>
    </span>,
    4: <span>
      The Session Button changes to <bold style={{color: "red", fontWeight:"bold"}}>Cancel</bold> while Echo Reader is listening. The microphone icon will glow when recording has started. The dots will bounce when Echo Reader starts analyzing your speech. Echo Reading will stop listening after you have spoken the same number of words that are in the sentence.
    </span>
  }

  return (
    <div className="page ">
      <div className="page-content-container">
        <h1 className="mb-6">How to Use Echo Reader</h1>
        <div>
          <Instruction key={0} IMG={GoScreen}  text={instructionsText[1]} />
          <Instruction key={1} IMG={WarningModal} text={instructionsText[0]}/>
          <Instruction key={2} IMG={GoScreen}  text={instructionsText[0]} />

        </div>
      </div>
    </div>
  );
};

export default Instructions;
