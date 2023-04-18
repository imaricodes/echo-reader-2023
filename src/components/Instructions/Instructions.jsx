import React from "react";
import goScreenComputerNoFrame from "../../assets/go-screen-no-frame.png";
import Instruction from "./Instruction";

const Instructions = () => {
  const instructionsText = [
    "Before you can start reading aloud to Echo Reader, please allow microphone access.",
  ]

  return (
    <div>
       <Instruction otherIMG={goScreenComputerNoFrame} key={0}>
      {instructionsText[0]}
    </Instruction>
       <Instruction otherIMG={goScreenComputerNoFrame} key={1}>
      {instructionsText[0]}
    </Instruction>
    </div>
  );

   
   
};

export default Instructions;
