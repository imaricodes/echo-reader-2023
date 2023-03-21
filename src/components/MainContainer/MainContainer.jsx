import React, {useState, useRef} from 'react'
// import Header from '../Header'
import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
// import { SessionContextProvider } from '../../contexts/SessionContext'
import { SessionContextProvider } from '../../contexts/SessionContext'
import Header from '../Header'
import Card from '../../../Card'


const MainContainer = () => {

const [sessionState, setSessionState] = useState('go');
const [isListening, setIsListening] = useState(false);
// console.log('current parent session sate ', sessionState)



  return (
    <SessionContextProvider>
        <div className='main-container px-10'>
          <Header />
      
      

          <Stage
            setSession = {setSessionState}
            currentSessionState = {sessionState}
            isListengingState = {isListening}
          />

          <ControlsContainer
            setSessionState = {setSessionState}
            currentSessionState={sessionState}
            setIsListening = {setIsListening}
          />  


        </div>
</SessionContextProvider>
  )
}

export default MainContainer