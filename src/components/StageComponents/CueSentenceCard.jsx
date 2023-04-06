import React, {useRef, useEffect, useContext} from 'react'
import { processCue } from "../../js/processCue";
import { SessionContext } from '../../contexts/SessionContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone} from '@fortawesome/free-solid-svg-icons'



const CueSentenceCard = (props) => {
  console.log('rendering CueSentenceCard')


  const CUE_PHRASES = [
    "The cat sat on me.",
    "I love to play outside.",
    "The sun is very hot.",
    "Dogs like to chase squirrels.",
    "She ran very fast today.",
    "He always picks pizza.",
    "I saw a bird fly.",
    "The flowers are so pretty.",
    "My cat sleeps a lot.",
    "We are best friends forever.",
    "I feel happy and excited.",
    "The sky is so blue.",
    "I want to go swimming.",
    "I have a toy car.",
    "The beach is very sandy."
  ];
  
 
  const {sessionState, setSessionState,socket} = useContext(SessionContext);
  const cueRef = useRef(null);
  const micIconRef = useRef(null);
  const micIconPulseRef = useRef(null);


  useEffect(() => {
    let selectedCue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
    cueRef.current.innerText = selectedCue;
    //send cue data to server
    console.log('sending cue data to server');
    let processedCue = processCue(selectedCue);
    console.log('processedCue: ',processedCue);
    socket.emit("send_cueData", processedCue);
  },[])

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

    <div className= 'card card__stage card__display--flex-column  card__stage--text lg:width[500px] relative '>
      <div className='absolute top-5 right-2 w-full'> 
        <div className='flex  justify-center items-center  relative'>
              <span ref={micIconRef} className='flex justify-center items-center bg-gray-200 w-10 h-10 rounded-full z-50 '><FontAwesomeIcon icon={faMicrophone} className='h-[45%]  text-white '  /></span>
              <span ref={micIconPulseRef} className='hidden bg-red-600 w-14 h-14 rounded-full  animate-pulse-fade-grow absolute'/>
          </div>
      </div>
      <div className=' w-full text-center ' ref={cueRef}></div>
    </div>
  )
}

export default CueSentenceCard