import { useContext, useState, useEffect, useRef, useCallback } from "react";

// import { SessionContext } from "../../contexts/SessionContext";
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";
import SocketContext from "../../socketIO/socketContext";
import { socket } from "../../socketIO/socket-service";
import CueSentenceCard from "../StageComponents/CueSentenceCard";
import StartCard from "../StageComponents/StartCard";
import ResultsCard from "../StageComponents/ResultsCard";
import ResultCard from "../StageComponents/ResultCard";
import TimeUpCard from "../StageComponents/TimeUpCard";
import SessionInstructions from "./SessionInstructions";
import CueCard from "../StageComponents/CueCard";
import CardStage from "../UI/CardStage";
import studentIMG from "../../assets/student-reading.svg";
import Card from "../UI/Card";

import useSocketConnect from "../../hooks/useSocketConnect";
import ResponseAnalysis from "../ResponseAnalysis/ResponseAnalysis";

const Stage = () => {
  const [stageState, setStageState] = useState("instruction");

  const { readingSessionIsActive, setReadingSessionIsActive } = useContext(
    ReadingSessionContext,
  );

  const { session_results } = useContext(SocketContext);

  const { connectSocket, disconnectSocket } = useSocketConnect();

  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  useEffect(() => {
    session_results.length > 0 && setStageState("result");
  }, [session_results]);

  return (
    // <div className="stage stage--height lg:mb-0 lg:h-[300px] ">
    <div className="stage--two-col sm:w-3/4 mx-auto gap-10">
      <div className="col-span-2 flex justify-center ">
        <div className=" w-full ">
          <CardStage>
              {stageState === "instruction" ? (
                <SessionInstructions setStageState={setStageState} />
              ) : null}

              {stageState === "cue" ? (
                <CueCard setStageState={setStageState} />
              ) : null}

              {stageState === "result" ? (
                <ResultsCard setStageState={setStageState} />
              ) : null}
         
          </CardStage>
        </div>
      </div>

      <div className="flex justify-center">
        {stageState === "instruction" || stageState === "cue" ? (
          <div className="flex justify-center items-center w-full" >
            <img src={studentIMG} alt="Student reading book" />
          </div>
        ) : (
          <ResponseAnalysis />
        )}
      </div>


    </div>
  );
};

export default Stage;
