import React, {useRef, useEffect, useContext} from 'react'
import { processCue } from "../../js/processCue";
import { SessionContext } from '../../contexts/SessionContext'
import MicIcon from '../MicIcon'



const CueSentenceCard = (props) => {
  console.log('rendering CueSentenceCard')


  const CUE_PHRASES = [
    "The truth hurts my feet.",
    "Those are beautiful shoes.",
    "I want candy.",
    "More people eat chicken now.",
    "Salamanders are slimy creatuers.",
    "Nobody likes rotten candy.",
    "Math is fun.",
    "A sunny day is a great day.",
    "I like peanuts in my cereal.",
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

    <div className= 'card card--bg-gray card--shadow card__stage--height card__stage--text card__display--flex-column relative '>
      <div className='w-full absolute top-0'> 
        <div className='flex w-full justify-end items-center pt-5 px-4'> 
          <div ref={micOutter}>
            <MicIcon/>
          </div>
        </div>
      </div>
      <div ref={cueRef}></div>
    </div>
  )
}

export default CueSentenceCard