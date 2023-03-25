import React, {useContext, useRef, useState, useEffect} from 'react'
import { SessionContext } from '../../contexts/SessionContext'

import SessionButton from '../SessionButton/SessionButton'




const ControlsContainer = (props) => {
  // let currentSessionState = {...props.currentSessionState}

  // const setSession = props.setSession;
  // const setListeningState = props.setIsListening;

  const {sessionState, setSessionState} = useContext(SessionContext);

  const [instructionsText, setInstructionsText] =useState('Click \'Go\' to load a sentence.')

  useEffect (()=> {
    sessionState ==='start' && setInstructionsText('When you are ready to read aloud, click \'Start\' ');
    sessionState ==='listen' && setInstructionsText('Click Cancel to end the session');
    sessionState ==='cancel' && setInstructionsText('Click \'Go\' to load a sentence.');
    sessionState ==='restart' && setInstructionsText('Click restart for another sentence to read.');
    sessionState ==='go' && setInstructionsText('Click \'Go\' to load a sentence.');

  },[sessionState])



  return (

    <div className='card card__controls-container card__controls-container--text card__controls-container--padding flex items-center justify-end gap-6 min-h-20 '>
      <div className='flex grow justify-center text-lg'>
        {instructionsText}
      </div>
      <div>
        <SessionButton 
          setSessionState={props.setSessionState}
          currentSessionsState = {props.currentSessionState} 
          setIsListening={props.setIsListening}
        />
      </div>
   

    </div>
  )
}

export default ControlsContainer