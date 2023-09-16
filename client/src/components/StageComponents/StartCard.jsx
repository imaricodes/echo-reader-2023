import React, { useEffect, useContext } from "react";
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";
import Card from "../UI/Card";

const StartCard = () => {
  const { setReadingSessionIsActive } = useContext(ReadingSessionContext);

  const handleClick = () => {
    setReadingSessionIsActive(true);
  };

  return (
    <Card>
      <div className="" >
        <p className="text-lg leading-7 mb-3 sm:text-2xl lg:text-3xl lg:leading-10 ">
          Echo Reader uses speech recognition to help you practice reading
          aloud.
        </p>

        <p className="text-lg leading-7 sm:text-2xl lg:text-3xl lg:leading-10  ">
          ChatGPT is also used to give feedback on your reading.
        </p>
        <div className="flex justify-center mt-10">
        <button className="btn bg-green-500" onClick={handleClick}>
          Start
        </button>

        </div>
      
      </div>
    </Card>
  );
};

export default StartCard;
