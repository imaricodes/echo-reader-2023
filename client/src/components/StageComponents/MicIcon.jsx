import { useRef, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import useStartRecorder from "../../hooks/useStartRecorder";


const MicIcon = () => {
  const micIconRef = useRef(null);
  const micIconPulseRef = useRef(null);
  const {startRecorder, micActive, setMicActive} = useStartRecorder();

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  });

  


  useEffect(() => {
    if (micActive === true) {
      micIconRef.current.classList.remove("bg-gray-200");
      micIconRef.current.classList.add("bg-red-600");
      micIconPulseRef.current.classList.remove("hidden");
    } else if (micIconRef.current.classList.contains("bg-red-600")) {
      micIconRef.current.classList.remove("bg-red-600");
      micIconRef.current.classList.add("bg-gray-200");
      micIconPulseRef.current.classList.add("hidden");
    }
  }, [micActive]);

  const handleMicClick =  () => {
    if (!micActive) {
      setMicActive(true);
      startRecorder();
    }
  };

  return (
    <div className="mx-auto flex">
      <div>{renderCount.current}</div>
      <button
        onClick={handleMicClick}
       disabled = {micActive}
        ref={micIconRef}
        className="z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 "
      >
        <FontAwesomeIcon icon={faMicrophone} className="h-[45%]  text-white hover:cursor-pointer" />
      </button>
      <span
        ref={micIconPulseRef}
        className="absolute hidden h-10 w-10 animate-pulse-fade-grow  rounded-full bg-red-600 "
      />
    </div>
  );
};

export default MicIcon;
