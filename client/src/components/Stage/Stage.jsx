import { useState, useEffect } from "react";

//*** DATA, ASSETS ***//
import studentIMG from "../../assets/student-reading.svg";

//*** COMPONENTS ***//
// import TimeUpCard from "../StageComponents/TimeUpCard";
import SessionInstructions from "./SessionInstructions";
import CardStage from "../UI/CardStage";
import CueCard from "../StageComponents/CueCard";
import ResultsCard from "../StageComponents/ResultsCard";

//*** HOOKS ***//
import useSocketConnect from "../../hooks/useSocketConnect";
import ResponseAnalysis from "../ResponseAnalysis/ResponseAnalysis";

const Stage = () => {
  //*** STATES, CONTEXTS, HOOKS ***//
  const [stageState, setStageState] = useState("instruction");
  const { connectSocket, disconnectSocket } = useSocketConnect();

  //*** EFFECTS ***//
  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, [connectSocket, disconnectSocket]);

  return (
    <div className="stage--two-col sm:w-3/4 mx-auto gap-10">
      <div className="col-span-2 flex justify-center ">
        <div className="w-full">
          <CardStage>

            {stageState === "instruction" ? (
              <SessionInstructions setStageState={setStageState} stageState={stageState} />
            ) : null}

            {stageState === "cue" ? (
              <CueCard setStageState={setStageState} stageState={stageState} />
            ) : null}

            {stageState === "result" ? (
              <ResultsCard
                setStageState={setStageState}
                stageState={stageState}
              />
            ) : null}
          </CardStage>
        </div>
      </div>

      <div className="flex justify-center">
        {stageState === "instruction" || stageState === "cue" ? (
          <div className="flex justify-center items-center w-full">
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
