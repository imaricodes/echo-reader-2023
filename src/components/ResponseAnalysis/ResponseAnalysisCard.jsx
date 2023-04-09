import React, { useEffect, useContext, useRef } from 'react'
import studentIMG from '../../assets/student-reading.svg'
import ResponseAnalysisData from './ResponseAnalysisData'
import { SessionContext } from '../../contexts/SessionContext'



const ResponseAnalysisCard = () => {
  const {sessionState, setSessionState, socket, setSocket} = useContext(SessionContext);

  const responseAnalysisDataRef = useRef()
  const studentIMGRef = useRef()

  //hide img when state is result and show responseAnalysisData

  useEffect(() => { 
    if (sessionState === 'results') {

      studentIMGRef.current.classList.add('hidden')
      responseAnalysisDataRef.current.classList.remove('hidden')
      responseAnalysisDataRef.current.classList.add('block')
      console.log(`sessionState is result`)
    } else if (sessionState === 'go' || sessionState === 'start') {
      studentIMGRef.current.classList.contains('hidden') ? studentIMGRef.current.classList.remove('hidden') : null

      responseAnalysisDataRef.current.classList.contains('block')
        ?
        (responseAnalysisDataRef.current.classList.remove('block'), responseAnalysisDataRef.current.classList.add('hidden'))
        :
        null

      }
    // return () => {
    //   if (sessionState === 'result') {
    //     console.log(`sessionState is result`)
    //   }
    // }

  }, [sessionState])

  return (
    <div className='bg-white card flex flex-col items-center  lg:flex lg:flex-col lg:justify-center  lg:w-[383px] lg:items-center  xl:w-[450px] '>
      <div  ref={responseAnalysisDataRef} className='hidden'>
        <ResponseAnalysisData/>
      </div>
      
      <img ref={studentIMGRef} className='hidden' src={studentIMG} alt="Student reading book"/>
    </div>
  )
}

export default ResponseAnalysisCard