import React, {useRef, useEffect, useContext} from 'react'
import { processCue } from "../../js/processCue";
import { SessionContext } from '../../contexts/SessionContext'
import MicIcon from '../MicIcon'



const CueSentenceCard = (props) => {
  console.log('rendering CueSentenceCard')


  const CUE_PHRASES = [
    "The cat sat on me.",
    "I love to play outside.",
    "The sun is very hot.",
    "Dogs like to chase squirrels.",
    "She ran very fast today.",
    "He eats pizza every day.",
    "I saw a bird fly.",
    "The flowers are so pretty.",
    "My cat sleeps a lot.",
    "We are best friends forever.",
    "I feel happy and excited.",
    "The sky is so blue.",
    "I want to go swimming.",
    "I have a toy car.",
    "The beach is so sandy."
  ];
  
 
  const {sessionState, setSessionState,socket} = useContext(SessionContext);

  const micOutter = useRef(null);
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

    <div className= 'card card__stage card__stage--text lg:width[500px] relative xl:card__stage--text-screen-2xl '>
      <div className='absolute top-2 right-2'> 
        <div className='flex w-full justify-end items-center pt-5 px-4'> 
          <div ref={micOutter}>
            <MicIcon/>
          </div>
        </div>
      </div>
      <div className=' w-full text-center ' ref={cueRef}></div>
    </div>
  )
}

export default CueSentenceCard