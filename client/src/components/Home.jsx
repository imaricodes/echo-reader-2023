import { useContext } from "react";
import { ReadingSessionContext } from "../contexts/ReadingSessionContext";
// import StartCard from "./StageComponents/StartCard";
// import studentIMG from "../../assets/student-reading.svg";
import studentIMG from "../assets/student-reading.svg";
import Card from "../components/UI/Card";
import CueCardControls from "./StageComponents/CueCardControls";
import CardStage from "./UI/CardStage";
import Button from "./UI/Button";

const Home = () => {
  const { setReadingSessionIsActive } = useContext(ReadingSessionContext);

  const handleStart = () => {
    setReadingSessionIsActive(true);
  };

  return (
    <div className="stage--two-col w-full sm:w-3/4 mx-auto gap-10">
      <div className="col-span-2 flex justify-center">
   
          <CardStage>
            <div className="mb-10">
              <p>
                Echo Reader uses speech recognition to help you practice reading
                aloud.
              </p>

              <p>ChatGPT is also used to give feedback on your reading.</p>
              <p>Click Start to begin.</p>
            </div>

            <div className="flex justify-center">
              {/* <button className="btn bg-green-500 " onClick={handleStart}>
                Start
              </button> */}
              <Button onClick={handleStart} bgColor={'green'}>
               Start
              </Button>
            </div>
          </CardStage>
      
      </div>
      <div className="flex justify-center items-center">
        <img src={studentIMG} alt="Student reading book" className="w-full " />
      </div>
    </div>
  );
};

export default Home;
