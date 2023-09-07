import { useContext } from "react";
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";
import Stage from "../Stage/Stage";
import Home from "../Home";
import ResponseAnalysisCard from "../ResponseAnalysis/ResponseAnalysisCard";
import SocketProvider from "../../socketIO/socketProvider";

const MainContainer = () => {
  const { readingSessionIsActive, setReadingSessionIsActive } = useContext(
    ReadingSessionContext,
  );

  return (
    <SocketProvider>
      <div className="main-container">
        <div className="lg:w-[600px] xl:w-[700px]">
          {/* <ControlsContainer/> */}
          {readingSessionIsActive ? <Stage /> : <Home />}
        </div>
        {/* <ResponseAnalysisCard/> */}
      </div>
    </SocketProvider>
  );
};

export default MainContainer;
