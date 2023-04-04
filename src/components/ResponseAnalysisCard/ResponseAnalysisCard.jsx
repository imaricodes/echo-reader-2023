import React, { useEffect, useContext, useRef } from 'react'
import studentIMG from '../../assets/student-reading.svg'
import { SessionContext } from '../../contexts/SessionContext'

const ResponseAnalysisCard = () => {
  const {socket, setSocket} = useContext(SessionContext);
  const analysisRef = useRef()

useEffect(() => { 
    if (socket) {
      socket.on('chatGPT_response', (data) => {
        console.log(`chatGPT_response:`, data.chatGPTAnalysis.content);
        analysisRef.current.innerHTML = data.chatGPTAnalysis.content;
      })
    }
    return () => {
      if (socket) {
        socket.off('chatGPT_response')

        socket.on('chatGPT_response', (data) => {
       analysisRef.current.innerHTML = data.chatGPTAnalysis.content;})
      }
    }
}, [socket])

  return (
    <div className='bg-white card  lg:flex   lg:w-[383px] lg:items-center lg:justify-center xl:w-[450px] '>
      <div ref={analysisRef}></div>
      <img className=' ' src={studentIMG} alt="Student reading book"/>
    </div>
  )
}

export default ResponseAnalysisCard