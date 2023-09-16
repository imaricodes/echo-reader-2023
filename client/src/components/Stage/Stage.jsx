import { useContext, useState, useEffect } from "react";

//Data, Assets
import studentIMG from "../../assets/student-reading.svg";

//Contexts
import SocketContext from "../../socketIO/socketContext";

//Components
import TimeUpCard from "../StageComponents/TimeUpCard";
import SessionInstructions from "./SessionInstructions";
import CardStage from "../UI/CardStage";
import CueCard from "../StageComponents/CueCard";
import ResultsCard from "../StageComponents/ResultsCard";

//Web Sockets

//Hooks
import useSocketConnect from "../../hooks/useSocketConnect";
import ResponseAnalysis from "../ResponseAnalysis/ResponseAnalysis";

const Stage = () => {

  //States, Context, Hooks
  const [stageState, setStageState] = useState("instruction");
  const { session_results } = useContext(SocketContext);
  const { connectSocket, disconnectSocket } = useSocketConnect();

  //Effects
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
