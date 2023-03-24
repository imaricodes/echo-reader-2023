import React, {useRef, useEffect} from 'react'
import MicIcon from '../MicIcon'



const CueSentenceCard = (props) => {
  const currentSessionState = props.currentSessionState;
  const cuePresentationContainerRef = useRef();
  const micOutter = useRef(null);

  useEffect(()=> {
    cuePresentationContainerRef.current.innerText = props.cue;
  },[])

  useEffect(()=> {
  if (currentSessionState === 'listen') {
      micOutter.current.classList.add('animate-pulse');
    } else {
      micOutter.current.classList.remove('animate-pulse');
    }
  },[currentSessionState])


  return (

    <div className= 'card card--bg-gray card--shadow card__stage--height card__stage--text card__display--flex-column relative '>
      <div className='w-full absolute top-0'> 
        <div className='flex w-full justify-end items-center pt-5 px-4'> 
          <div ref={micOutter} className='w-8 opacity-95 animate-pulse'>
            <MicIcon currentSessionState={currentSessionState}/>
          </div>
        </div>
      </div>
      <div ref={cuePresentationContainerRef}></div>
    </div>
  )
}

export default CueSentenceCard