import { useRef } from "react";
import studentIMG from "../../assets/student-reading.svg";
import ResponseAnalysisData from "./ResponseAnalysis";


const ResponseAnalysisCard = ({ readingSessionIsActive }) => {

  const responseAnalysisDataRef = useRef();
  const studentIMGRef = useRef();

  return (
    <div className="bg-white card flex flex-col items-center  lg:flex lg:flex-col lg:justify-center  lg:w-[383px] lg:items-center  xl:w-[450px] ">
      <div
        ref={responseAnalysisDataRef}
        // className={`${!readingSessionIsActive ? "hidden" : "block"}`}
      >
        <ResponseAnalysisData />response analyss data
      </div>


    </div>
  );
};

export default ResponseAnalysisCard;
