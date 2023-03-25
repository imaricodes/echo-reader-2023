import React, {createContext, useState} from "react";



export const SessionContext = createContext();

export const SessionContextProvider = (props) => {
  const [sessionState, setSessionState] = useState('go')
  const [isRecordingState, setIsRecordingState] = useState(false)
  const [socket, setSocket] = useState(null)

  

    return (
      <SessionContext.Provider value={{
          sessionState: sessionState,
          setSessionState: setSessionState,
          isRecording: isRecording,
          setIsRecording: setIsRecording,
          socket: socket,
          setSocket: setSocket}}>
        {props.children}
      </SessionContext.Provider>
    );
};