import React, {useState, useContext, useEffect, useRef} from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { SessionContext } from '../contexts/SessionContext'

const CountdownTimer = () => {
  const {sessionState, setSessionState, socket} = useContext(SessionContext);
  const [counterIsActive, setCounterIsActive] = useState(false);
  const [key, setKey] = useState(0);
  const countdownCircleTimerRef = useRef(null);

  socket.on("google_speech_listening", (data) => {
    console.log('google_speech_listening: ', data)
    sessionState === 'listen' ? setCounterIsActive(true): setCounterIsActive(false)

  })

  //start countdown when speech_processing_finished is received
useEffect(() => {
  

  if (sessionState === 'start') {
    setKey(prev => prev + 1)
  }

} ,[sessionState])

const countdownCircleTimerDone = () => {
  console.log('countdownCircleTimerDone')
  if (sessionState === 'listen') { 
    console.log('still in listen state, set state to timeUP')
    countdownCircleTimerRef.current.classList.add('text-gray-200')
    socket.emit("cancel_session", "cancel_session from CountdownTimer component");
    console.group('sent cancel_session from CountdownTimer component to server')
    setSessionState('timeUp')
  }
 
}

  return (
    <>
        <span className='absolute text-base font-bold' ref={countdownCircleTimerRef} >
        <CountdownCircleTimer
                key={key}
                isPlaying = {counterIsActive}
                duration={10}
                colors={'#22C55E'}
                trailColor={'#E5E7EB'}
                strokeWidth={5}
                trailStrokekWidth={5}
                colorsTime={[7, 5, 2, 0]}
                size={40}
                onComplete={countdownCircleTimerDone}
              >
                {({ remainingTime }) => remainingTime -5}
          </CountdownCircleTimer>
        </span>
    </>
  )
}

export default CountdownTimer