import React, {useState, useContext, useEffect, useRef} from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { SessionContext } from '../contexts/SessionContext'

const CountdownTimer = () => {
  const {sessionState, setSessionState, socket} = useContext(SessionContext);
  const [counterIsActive, setCounterIsActive] = useState(false);
  const [key, setKey] = useState(0);
  const countdownCircleTimerRef = useRef(null);

  //start countdown when speech_processing_finished is received
useEffect(() => {
  sessionState === 'listen' ? setCounterIsActive(true): setCounterIsActive(false)

  if (sessionState === 'start') {
    setKey(prev => prev + 1)
  }

} ,[sessionState])

const countdownCircleTimerDone = () => {
  console.log('countdownCircleTimerDone')
  // countdownCircleTimerRef.current.classList.remove('text-base')
  countdownCircleTimerRef.current.classList.add('text-gray-200')
  socket.emit("cancel_session", "cancel_session from CountdownTimer component");
  setSessionState('timeUp')
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
                {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </span>
    </>
  )
}

export default CountdownTimer