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
    0: (
      <span>
        <p>Directions for each step will appear in the <span className="font-bold text-orange-400">Control Bar</span>. The <span className="font-bold text-orange-400">Session
        Button</span> allows you to control your session. The text on the button will change depending on what step you are on.</p> <p>Sentences to read and
        your reading results will appear on the <span className="font-bold text-orange-400">Stage</span>.</p>
      </span>
    ),
    1: <span>Click <span className="font-bold text-green-500">Go</span> to get your first reading sentence. </span>,
    2: (
      <span>
        If you are not using Chrome or Firefox on a laptop or desktop computer,
        you may see a warning the first time you try to load a sentence.
      </span>
    ),
    3: (
      <span>
        Before you can start reading aloud to Echo Reader, please <span className="font-bold">allow
        microphone access</span> if you have not already.
      </span>
    ),
    4: (
      <span>
        <p>After clicking <span className="font-bold text-green-500">Go</span>, you will see a new sentence. Take a moment to
        practice reading the sentence silently or aloud.</p> <p>Echo Reader will start
        listening when you click <span className="font-bold text-green-500">Start</span> on the <span className="font-bold text-orange-400">Session
        Button</span>.</p> In this beta version, it is possible
        that the same sentence is presented back to back. To load a new sentence,
        click the <span className="font-bold text-orange-400">Refresh</span> button.
      </span>
    ),
    5: (
      <span>
        <p>The <span className="font-bold text-orange-400">Session
        Button</span> changes to <span className="font-bold text-red-500">Cancel</span> while Echo Reader is listening. Click it to stop the session and load a new sentence.</p> <p>The
        dots on the left will bounce when Echo Reader starts analyzing your
        speech.</p>
      </span>
    ),
    6: (
      <span>
        <p>Your results will look like this.</p><p> What Echo Reader heard you say is
        under the orginal sentence.</p> <p>All green words means you read every word
        correctly. Click <span className="font-bold text-green-500">Again</span> on the <span className="font-bold text-orange-400">Session
        Button</span> to load a new sentence.</p>
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
        <p>Ask ChatGPT to give you more detailed freedback about your reading.</p> <p>If ChatGPT is busy, try again on the next round.</p> 
      </span>
    ),
  };

  return (
    <div className="page mb-10 ">
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
