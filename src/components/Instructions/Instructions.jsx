import React from "react";
import Instruction from "./Instruction";

// import goScreenComputerNoFrame from "../../assets/go-screen-no-frame.png";

import WarningModal from "../../assets/instructions-warning-modal.png";
import GoScreen from "../../assets/instructions-go-screen.png";

const Instructions = () => {
  const instructionsText = [
    "Before you can start reading aloud to Echo Reader, please allow microphone access.",
    " If you are not using Chrome or Firefox on a laptop or desktop computer, you may see a warning the first time you load a sentence.",
    "Click 'Go' to get your first reading sentence.",
  ];

  return (
    <div className="page ">
      <div className="page-content-container">
        <h1 className="mb-6">How to Use Echo Reader</h1>
        <div>
          <Instruction IMG={WarningModal} key={0}>
            {instructionsText[0]}
          </Instruction>
          <Instruction IMG={WarningModal} key={1}>
            {instructionsText[1]}
          </Instruction>
          <Instruction IMG={GoScreen} key={2}>
            {instructionsText[2]}
          </Instruction>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
