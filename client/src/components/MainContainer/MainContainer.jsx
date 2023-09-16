import { useContext } from "react";
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";
import Stage from "../Stage/Stage";
import Home from "../Home";
import ResponseAnalysisCard from "../ResponseAnalysis/ResponseAnalysisCard";
import SocketProvider from "../../socketIO/socketProvider";
import studentIMG from "../../assets/student-reading.svg";

const MainContainer = () => {
  const { readingSessionIsActive, setReadingSessionIsActive } = useContext(
    ReadingSessionContext,
  );

  return (
    <SocketProvider>
      <div>
        <div className="mx-3 ">
          {/* <ControlsContainer/> */}
          {readingSessionIsActive ? <Stage /> : <Home />}
        </div>
        {/* <ResponseAnalysisCard readingSessionIsActive = {readingSessionIsActive}/> */}
        {/* <span className={` main-container-right ${readingSessionIsActive ? "hidden" : "block"}`}>
          <div
            className={`bg-white card flex flex-col items-center  lg:flex lg:flex-col lg:justify-center lg:items-center  lg:w-[383px]   xl:w-[450px]  `}
          >
            <img src={studentIMG} alt="Student reading book" />
          </div>
        </span> */}
      </div>
    </SocketProvider>
  );
};

export default MainContainer;
