import { createContext, useState } from "react";

export const ReadingSessionContext = createContext();

export const ReadingSessionContextProvider = (props) => {
  const [readingSessionIsActive, setReadingSessionIsActive] = useState(false);
  const [stageState, setStageState] = useState("instruction");
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
      {props.children}
    </ReadingSessionContext.Provider>
  );
};
