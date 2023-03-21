import React, {useContext, useRef, useState, useEffect} from 'react'

import SessionButton from '../SessionButton/SessionButton'




const ControlsContainer = (props) => {
  // let currentSessionState = {...props.currentSessionState}

  const setSession = props.setSession;
  const setListeningState = props.setIsListening;

  const [instructionsText, setInstructionsText] =useState('Click Go to load a sentence for reading.')

  useEffect (()=> {
    props.currentSessionState ==='start' && setInstructionsText('When you are ready to read the sentence aloud, click Start.');
    props.currentSessionState ==='listen' && setInstructionsText('Click Cancel to end the session');
    props.currentSessionState ==='cancel' && setInstructionsText('Click Go to load a sentence for reading.');
    props.currentSessionState ==='restart' && setInstructionsText('Click restart for another sentence to read.');
    props.currentSessionState ==='go' && setInstructionsText('Click Go to load a sentence for reading.');

  },[props.currentSessionState])



  return (

    <div className='card card__controls-container card__controls-container--text card__controls-container--padding flex items-center gap-10'>

      {instructionsText}
     <SessionButton 
     setSessionState={props.setSessionState}
     currentSessionsState = {props.currentSessionState} 
     setIsListening={props.setIsListening}
     />
   

    </div>
  )
}

export default ControlsContainer