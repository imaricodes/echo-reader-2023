import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const ReadingSessionContext = createContext();

export const ReadingSessionContextProvider = ({children}) => {
  const [readingSessionIsActive, setReadingSessionIsActive] = useState(false);
  const [stageState, setStageState] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [micPermission, setMicPermission] = useState(false)
  const [processingResults, setProcessingResults] = useState(false)

  return (
    <ReadingSessionContext.Provider
      value={{
        readingSessionIsActive: readingSessionIsActive,
        setReadingSessionIsActive: setReadingSessionIsActive,
        stageState: stageState,
        setStageState: setStageState,
        isRecording: isRecording,
        setIsRecording: setIsRecording,
        micPermission: micPermission,
        setMicPermission: setMicPermission,
        processingResults: processingResults,
        setProcessingResults: setProcessingResults

      }}
    >
      {children}
    </ReadingSessionContext.Provider>
  );
};

ReadingSessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
