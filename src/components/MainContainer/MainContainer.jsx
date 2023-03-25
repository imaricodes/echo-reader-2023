import React, {useState, useRef, useEffect} from 'react'
import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
import { SessionContextProvider } from '../../contexts/SessionContext'
import { browserDeviceDetection } from '../../utilities/browserDeviceDetection.mjs'

const MainContainer = () => {

  //TODO: Why does this hide navbar image? Write a modal popup script for this alert.
  useEffect(()=> {
    browserDeviceDetection() ? alert(`This app is not optimized for browsers other than Chrome. It will work on Chrome mobile, but using Chrome on a laptop or desktop is recommended.`) : null

  },[])

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