import React, {useContext, useState, useEffect} from 'react'
import { SessionContext } from '../../contexts/SessionContext'

import SessionButton from '../SessionButton/SessionButton'




const ControlsContainer = (props) => {

  const {sessionState, setSessionState} = useContext(SessionContext);

  const [instructionsText, setInstructionsText] =useState('Click \'Go\' to load a sentence.')

  useEffect (()=> {
    sessionState ==='start' && setInstructionsText('When you are ready to read aloud, click \'Start\' ');
    sessionState ==='listen' && setInstructionsText('Click Restart to end the session');
    sessionState ==='cancel' && setInstructionsText('Click \'Go\' to load a sentence.');
    sessionState ==='restart' && setInstructionsText('Click \'Restart\' for another sentence.');
    sessionState ==='go' && setInstructionsText('Click \'Go\' to load a sentence.');

  },[sessionState])



  return (

    <div className='card card__controls-container card__controls-container--flex card__controls-container--text card__controls-container--padding card__controls-container--margin gap-7 lg:text-2xl xl:text-2xl bg-yellow-100'>
      <div className=''>
        {instructionsText}
      </div>
      <div>
        <SessionButton/>
      </div>
   

    </div>
  )
}

export default ControlsContainer