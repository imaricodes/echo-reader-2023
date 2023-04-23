import React from "react";
import Instruction from "./Instruction";


import StageSessionButtonImg from "../../assets/instructions-stage-sessionbutton.png";
import GoScreenImg from "../../assets/instructions-go-screen.png";
import WarningModalImg from "../../assets/instructions-warning-modal.png";
import MicPermissionImg from "../../assets/instructions-mic-permission.png";
import StartImg from "../../assets/instructions-start-screen.png";
import ListenCancelImg from "../../assets/instructions-listen-cancel-screen.png";
import ResultsPerfectImg from "../../assets/instructions-results-perfect-screen.png";
import KeyImg from "../../assets/instructions-key.png";
import AskChatGPTImg from "../../assets/instructions-ask-chat-gpt.png";

const Instructions = () => {
  const instructionText = [
    "Before you can start reading aloud to Echo Reader, please allow microphone access.",
    " If you are not using Chrome or Firefox on a laptop or desktop computer, you may see a warning the first time you load a sentence.",
    "Click 'Go' to get your first reading sentence.",
  ];

  const instructionsText = {
    10: (
      <span>
        Before you can reading aloud to{" "}
        <bold style={{ color: "red", fontWeight: "bold" }}>Echo Reader</bold>,
        please allow microphone access.
      </span>
    ),
    0: (
      <span>
        <p>Directions for each step will appear in the control bar. The Session
        Button allows you to start or cancel a session.</p> <p>Sentences to read and
        your reading results will appear on the Stage.</p>
      </span>
    ),
    1: <span>Click Go to get your first reading sentence. </span>,
    2: (
      <span>
        If you are not using Chrome or Firefox on a laptop or desktop computer,
        you may see a warning the first time you try to load a sentence.
      </span>
    ),
    3: (
      <span>
        Before you can start reading aloud to Echo Reader, please allow
        microphone access if you have not already.
      </span>
    ),
    4: (
      <span>
        <p>After clicking go, you will see a new sentence. Take a moment to
        practice reading the sentence silently or aloud.</p> <p>Echo Reader will start
        listening when you click Start.</p> In this beta version, it is possible
        that the same sentence is presented back to back. To get a new sentence,
        click Again.
      </span>
    ),
    5: (
      <span>
        <p>The Session Button changes to Cancel while Echo Reader is listening.</p> <p>The
        dots on the left will bounce when Echo Reader starts analyzing your
        speech.</p>
      </span>
    ),
    6: (
      <span>
        <p>Your results will look like this. What Echo Reader heard you say is
        under the orginal sentence.</p> <p>All green words means you read every word
        correctly. Click Again to load a new sentence.</p>
      </span>
    ),
    7: (
      <span>
        <p>This key will help you compare what you read to the orginal sentence. If
        your sentence is all green, nice! That's perfect!</p> <p>Yellow and red words
        show you words that are out of place or not in the sentence.</p> 
      </span>
    ),
    8: (
      <span>
        <p>Ask Chat GPT to give you more detailed freedback about your reading.</p> <p>If ChatGPT is busy, try again on the next round.</p> 
      </span>
    ),
  };

  return (
    <div className="page ">
      <div className="page-content-container">
        <h1 className="mb-6">How to Use Echo Reader</h1>
        <div>
          <Instruction key={0} IMG={StageSessionButtonImg} text={instructionsText[0]} />
          <Instruction key={1} IMG={GoScreenImg} text={instructionsText[1]} />
          <Instruction key={2} IMG={WarningModalImg} text={instructionsText[2]} />
          <Instruction key={3} IMG={MicPermissionImg} text={instructionsText[3]} />
          <Instruction key={4} IMG={StartImg} text={instructionsText[4]} />
          <Instruction key={5} IMG={ListenCancelImg} text={instructionsText[5]} />
          <Instruction key={6} IMG={ResultsPerfectImg} text={instructionsText[6]} />
          <Instruction key={7} IMG={KeyImg} text={instructionsText[7]} />
          <Instruction key={8} IMG={AskChatGPTImg} text={instructionsText[8]} />
        </div>
      </div>
    </div>
  );
};

export default Instructions;
