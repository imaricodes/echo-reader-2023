//*** REACT ***//
import { useEffect, useContext } from "react";

//** UTILITIES **//
import PropTypes from "prop-types";

//*** CONTEXTS, PROVIDERS ***//
import { ReadingSessionContext } from "../../contexts/ReadingSessionContext";

//*** COMPONENTS ***//
import MicIcon from "./MicIcon";

//*** HOOKS ***//
import useMicPermission from "../../hooks/useMicPermission";
import { useLocalStorage } from "../../hooks/useStorage";

//*** DATA, ASSETS ***//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CueCardControls = ({ stageState, setStageState }) => {

//*** STATES, CONTEXTS, HOOKS ***//
  const { getMicPermission, micAllowed } = useMicPermission();
  const { setReadingSessionIsActive } = useContext(ReadingSessionContext);
  const [, , removeCueSentence] = useLocalStorage("cue_sentence", null);
  const [, , removeSessionResults] = useLocalStorage("session_results", null);

//*** FUNCTIONS, HANDLERS ***//
  const advanceToNextItem = () => {
    removeCueSentence();
    removeSessionResults();
    setTimeout(() => {
      setStageState("cue");
    }, 0);
  };

  const handleQuit = () => {
    removeCueSentence();

    removeSessionResults();

    setTimeout(() => {
      setReadingSessionIsActive(false);
    }, 0);
  };

//*** EFFECTS ***//

//TODO: handle mic permission rejection/error
  useEffect(() => {
    if (!micAllowed) {
      getMicPermission().then((data) =>
        console.log("get mic permission data: ", data),
      );
    }
  }, [getMicPermission, micAllowed]);

  return (
    <div className=" grid grid-cols-3 absolute left-0 right-0 top-5 text-lg font-semibold ">
      <div>
        <div className="flex items-center gap-2 absolute left-10 ">
          <a className="cursor-pointer" onClick={handleQuit}>
            <FontAwesomeIcon icon={faTimes} className="h-8 text-red-600" />
          </a>
          <span>Quit</span>
        </div>
      </div>

      {/* microphone*/}
      {stageState === "cue" ? (
        <div className="  flex justify-center">
          <span className="z-50 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 ">
            <MicIcon />
          </span>
          <span className=" hidden h-8 w-8 animate-pulse-fade-grow  rounded-full bg-red-600 " />
        </div>
      ) : null}

      {/* refresh icon */}
      <div className="z-50 absolute right-10">
        <div className="flex">
          {stageState === "cue" ? (
            <FontAwesomeIcon
              icon={faRotate}
              className="h-8 text-orange-400 cursor-pointer"
              onClick={advanceToNextItem}
            />
          ) : (
            <div className="flex items-center gap-2">
              <span>Next</span>
              <a onClick={advanceToNextItem} className="cursor-pointer">
                <FontAwesomeIcon
                  icon={faForward}
                  className="h-8 text-green-500"
                />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

CueCardControls.propTypes = {
  stageState: PropTypes.string.isRequired,
  setStageState: PropTypes.func.isRequired,
};

export default CueCardControls;
