//React
import { useContext } from "react";
//Contexts, Providers
import SocketProvider from "../../socketIO/socketProvider";
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";
//Components
import Home from "../Home";
import Stage from "../Stage/Stage";

const MainContainer = () => {
  //States, Context, Hooks
  const { readingSessionIsActive } = useContext(ReadingSessionContext);

  return (
    <SocketProvider>
      <div>
        <div className="mx-3 ">
          {readingSessionIsActive ? <Stage /> : <Home />}
        </div>
      </div>
    </SocketProvider>
  );
};

export default MainContainer;
