import React, {useState, useEffect, useRef, useContext}from 'react'
import { SessionContext } from './contexts/SessionContext'

const DotAnimation = () => {

  const dotAnimationRef = useRef(null)
  const {socket} = useContext(SessionContext)
  const [isActive, setIsActive] = useState(false)
  const animationOnRef = useRef(null)
  const animationOffRef = useRef(null)

  // const addSocketGoogleSpeechListener = () => {
  //   socket.on("google_speech_listening", (data) => {
  //     // setTimeout(() => {}, 2000)
  //     dotAnimationRef.current.classList.remove('hidden')
  //     dotAnimationRef.current.classList.add('animate-dot-elastic-fade-in')
  //     socket.removeListener("google_speech_listening")
  //   })
  // }

  // useEffect(() => { 
  //     addSocketGoogleSpeechListener()
    
  // },[])

  // useEffect(() => {
    

  // },[socket])

  socket.on("google_speech_listening", (data) => {
    if (isActive === false) {
      setIsActive(prev=> !prev)
    }
    // dotAnimationRef.current.classList.remove('hidden')
    // dotAnimationRef.current.classList.add('animate-dot-elastic')
    // socket.removeListener("google_speech_listening")
    console.log('google_speech_listening: ', data)
  })

  useEffect(() => {
    if (isActive === true) {
      animationOnRef.current.classList.remove('hidden')
      animationOffRef.current.classList.add('hidden')
     
    }
  },[isActive])





  return (
    <div ref={dotAnimationRef} className=''>
      <div ref={animationOnRef} className='hidden'>
        <div  className='
            absolute flex top-7 left-12
            dot-elastic
            dot-elastic-animation
            before:dot-elastic-before-class 
            after:dot-elastic-after-class 
            before:dot-elastic-before-animation
            after:dot-elastic-after-animation' />
      </div>
       
       <div ref={animationOffRef} className='absolute flex top-7 left-12'>
       <div className='
          dot-elastic
          before:dot-elastic-before-class 
          after:dot-elastic-after-class 
         ' />
       </div>
      
    </div>
  
  )
}

export default DotAnimation