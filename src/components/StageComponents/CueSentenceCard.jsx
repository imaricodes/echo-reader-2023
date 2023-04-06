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


  useEffect(() => {
    let selectedCue = CUE_PHRASES[Math.floor(Math.random() * CUE_PHRASES.length)];
    cueRef.current.innerText = selectedCue;
   
      console.log(`current socket ${socket}`);
        //send cue data to server
        console.log('sending cue data to server')
        let processedCue = processCue(selectedCue);
        console.log('processedCue: ',processedCue)
        socket.emit("send_cueData", processedCue);
  },[])

  


  return (

    <div className= 'card card__stage card__display--flex-column  card__stage--text lg:width[500px] relative '>
      <div className='absolute top-5 right-2 w-full'> 
        <div className='flex  justify-center items-center  relative'>
              <span className='flex justify-center items-center bg-red-600 w-12 h-12 rounded-full z-50'><FontAwesomeIcon icon={faMicrophone} className='h-[45%]  text-white '  /></span>
              <span className=' bg-red-600 w-14 h-14 rounded-full animate-pulse-fade absolute'/>
            </div>
      </div>
      <div className=' w-full text-center ' ref={cueRef}></div>
    </div>
  )
}

export default CueSentenceCard