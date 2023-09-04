import {createContext, useState} from "react";



export const SessionContext = createContext();

export const SessionContextProvider = (props) => {
  const [sessionIsActive, setSessionIsActive] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [socket, setSocket] = useState(null)

  

    return (
      <SessionContext.Provider value={{
          isRecording: isRecording,
          setIsRecording: setIsRecording,
          socket: socket,
          setSocket: setSocket,
          sessionIsActive: sessionIsActive,
          setSessionIsActive: setSessionIsActive
          }}>
      
        {props.children}
      </SessionContext.Provider>
    );
};