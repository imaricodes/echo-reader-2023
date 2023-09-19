import { useRef, useEffect } from "react";

//*** HOOKS ***//
import useStartRecorder from "../../hooks/useStartRecorder";

//*** DATA, ASSETS ***//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

const MicIcon = () => {
  //*** STATES, CONTEXTS, HOOKS ***//
  const micIconRef = useRef(null);
  const micIconPulseRef = useRef(null);
  const { isRecording, setIsRecording, startRecorder } = useStartRecorder();

  //*** EFFECTS ***//
  useEffect(() => {
    if (isRecording === true) {
      micIconRef.current.classList.remove("bg-gray-200");
      micIconRef.current.classList.add("bg-red-600");
      micIconPulseRef.current.classList.remove("hidden");
    } else if (micIconRef.current.classList.contains("bg-red-600")) {
      micIconRef.current.classList.remove("bg-red-600");
      micIconRef.current.classList.add("bg-gray-200");
      micIconPulseRef.current.classList.add("hidden");
    }
  }, [isRecording]);

  //*** FUNCTIONS, HANDLERS ***//
  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
      startRecorder();
    }
  };

  return (
    <div className="mx-auto flex">
      <button
        onClick={handleMicClick}
        disabled={isRecording}
        ref={micIconRef}
        className="z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 "
      >
        <FontAwesomeIcon
          icon={faMicrophone}
          className="h-[45%]  text-white hover:cursor-pointer"
        />
      </button>
      <span
        ref={micIconPulseRef}
        className="absolute hidden h-10 w-10 animate-pulse-fade-grow  rounded-full bg-red-600 "
      />
    </div>
  );
};

export default MicIcon;
