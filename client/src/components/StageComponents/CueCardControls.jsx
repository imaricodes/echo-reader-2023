import useMicPermission from "../../hooks/useMicPermission";
// import DotAnimation from "../../DotAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import MicIcon from "./MicIcon";
import { useEffect } from "react";


const CueCardControls = () => {


  //check for mic permission
  const { getMicPermission, micAllowed } = useMicPermission();

useEffect ( () => {
  if(!micAllowed) {
    getMicPermission().then((data) => console.log('get mic permission data: ',data));
  }
  
}, [getMicPermission, micAllowed])

  



  return (
    <div className="absolute top-0 flex w-full px-10 pt-4 bg-green-200">
      {/* <DotAnimation /> */}

      {/* microphone*/}
      <div className="mx-auto flex">
        <span className="z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 ">
          <MicIcon />
        </span>
        <span className="absolute hidden h-10 w-10 animate-pulse-fade-grow  rounded-full bg-red-600 " />
      </div>

      {/* refresh icon */}
      <span className="">
        <button className="cursor-pointer">
          <FontAwesomeIcon icon={faRotate} className="h-6 text-orange-400" />
        </button>
      </span>
    </div>
  );
};

export default CueCardControls;
