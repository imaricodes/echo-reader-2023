import useMicPermission from "../../hooks/useMicPermission";
// import DotAnimation from "../../DotAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import MicIcon from "./MicIcon";
import { useEffect } from "react";

const CueCardControls = () => {
  //check for mic permission
  const { getMicPermission, micAllowed } = useMicPermission();

  useEffect(() => {
    if (!micAllowed) {
      getMicPermission().then((data) =>
        console.log("get mic permission data: ", data),
      );
    }
  }, [getMicPermission, micAllowed]);

  return (
    <div className=" flex w-full absolute">
      {/* <DotAnimation /> */}

      {/* microphone*/}
      <div className="mx-auto flex">
        <span className="z-50 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 ">
          <MicIcon />
        </span>
        <span className="absolute hidden h-8 w-8 animate-pulse-fade-grow  rounded-full bg-red-600 " />
      </div>

      {/* refresh icon */}
      <div className="z-50 absolute right-20 top-1 ">
        <button className="cursor-pointer">
          <FontAwesomeIcon icon={faRotate} className="h-8 text-orange-400" />
        </button>
      </div>
    </div>
  );
};

export default CueCardControls;
