import React, {useRef, useEffect, useContext, useState} from 'react'
import { processCue } from "../../js/processCue";
import { SessionContext } from '../../contexts/SessionContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone} from '@fortawesome/free-solid-svg-icons'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import CountdownTimer from '../CountdownTimer';


const CueSentenceCard = (props) => {
  console.log('rendering CueSentenceCard')

// console.log('use countdown: ', useCountdown)
  const CUE_PHRASES = [
    "The cat sat on me.",
    "I love to play at parks.",
    "The sun is very hot.",
    "Dogs like to chase squirrels.",
    "She ran very fast today.",
    "He always picks pizza.",
    "I saw a bird fly.",
    "The flowers are so pretty.",
    "My cat sleeps hard.",
    "We are best friends.",
    "I feel happy and excited.",
    "The sky is beautiful.",
    "I want to go swimming.",
    "John has a toy car.",
    "The beach is very sandy."
  ];


  const {sessionState, setSessionState, socket} = useContext(SessionContext);

  const cueRef = useRef(null);
  const micIconRef = useRef(null);
  const micIconPulseRef = useRef(null);
  const [cueSentence, setCueSentence] = useState('')

  const selectRandomCue = () => {
    let selectedCue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
      cueRef.current.innerText = selectedCue;
      //send cue data to server
      console.log('sending cue data to server');
      let processedCue = processCue(selectedCue);
      console.log('processedCue: ',processedCue);
      socket.emit("send_cueData", processedCue);
      return selectedCue
  }

  useEffect(() => {
  if (sessionState === 'start') {
    setCueSentence(selectRandomCue())
  }
      
  },[sessionState])

  // turn mic icon recording indicator on and off
  useEffect(() => {
    if (sessionState === 'listen') {
      micIconRef.current.classList.remove('bg-gray-200')
      micIconRef.current.classList.add('bg-red-600')
      micIconPulseRef.current.classList.remove('hidden')
    }
    else if (micIconRef.current.classList.contains('bg-red-600')) {
      micIconRef.current.classList.remove('bg-red-600')
      micIconRef.current.classList.add('bg-gray-200')
      micIconPulseRef.current.classList.add('hidden')
    }
  },[sessionState])


  return (

    <div className= 'card card__stage card__display--flex-column  card__stage--text bg-green-200 lg:width[500px] relative '>

      <div className=' absolute flex pt-4 px-10 top-0 w-full'>
        {/* TODO: what happens when the countdown is done? */}
        {/* countdown timer */}
        <CountdownTimer />
        {/* microphone*/}
        <div className='flex mx-auto'>
              <span ref={micIconRef} className='flex justify-center items-center bg-gray-200 w-10 h-10 rounded-full z-50 '><FontAwesomeIcon icon={faMicrophone} className='h-[45%]  text-white'  /></span>
              <span ref={micIconPulseRef} className='hidden bg-red-600 w-10 h-10 rounded-full  animate-pulse-fade-grow absolute '/>
        </div>
        {/* <span className='inline-block bg-purple-300'>
          <p>waiting dots</p>
        </span> */}
      </div>
      <div className=' w-full text-center ' ref={cueRef}>
        {cueSentence}
      </div>
    </div>
  )
}

export default CueSentenceCard