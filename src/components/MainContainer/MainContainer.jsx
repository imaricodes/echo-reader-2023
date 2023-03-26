import React, {useState, useRef, useEffect} from 'react'
import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
import { SessionContextProvider } from '../../contexts/SessionContext'
import { browserDeviceDetection } from '../../utilities/browserDeviceDetection.mjs'
import BrowserWarningModal from '../Modals/BrowserWarningModal'

const MainContainer = () => {

  return (
    
    <SessionContextProvider>
 
        <div className='main-container px-10 mt-14'>
   
          <Stage
            // setSession = {setSessionState}
            // currentSessionState = {sessionState}
            // isListengingState = {isListening}
          />

          <ControlsContainer
            // setSessionState = {setSessionState}
            // currentSessionState={sessionState}
            // setIsListening = {setIsListening}
          />
        </div>
</SessionContextProvider>
  )
}

export default MainContainer