import React, {useRef, useContext, useEffect, useState} from 'react'
import { SessionContext } from '../../contexts/SessionContext'


const ResponseAnalysisData = () => {
    const {sessionState, socket, setSocket} = useContext(SessionContext);
    const [analysis, setAnalysis] = useState(null);
    const analysisRef = useRef()
    const analysisButttonRef = useRef()

    useEffect(() => { 
        if (socket) {
          socket.on('chatGPT_response', (data) => {
            console.log(`chatGPT_response:`, data.chatGPTAnalysis.content);
            setAnalysis(data.chatGPTAnalysis.content);
          })
        }
        // return () => {
         
        // }
    }, [socket])

    useEffect(() => {
      //clear analysis if sessionState is not 'go'
      //show button if sessionState is 'go'
        if (sessionState !== 'results' && analysis !== null) {
            setAnalysis(null)
            analysisRef.current.innerHTML = '';
            analysisButttonRef.current.classList.remove('hidden')
        }
    }, [sessionState])

    const getAnalysis = () => {
        if (analysis) {
            analysisRef.current.innerHTML = analysis;
            analysisButttonRef.current.classList.add('hidden')
          }
    }

  

  return (
    <div className='flex flex-col items-center'>
        <h1 className='mb-6 text-center font-bold text-lg'>How to Read Results</h1>
        <div className='grid grid-cols-analysis-grid grid-rows-analysis-grid gap-x-3 gap-y-1 mb-10 text-lg'>
            <div><span className='inline-block bg-green-600 w-10 h-5 rounded-lg shadow'/></div>
            <div><p>Right word, right place</p></div>
            <div><span className='inline-block bg-yellow-400 w-10 h-5 rounded-lg shadow'/></div>
            <div><p>Right word, wrong place</p></div>
            <div><span className='inline-block bg-red-600 w-10 h-5 rounded-lg shadow'/></div>
            <div><p>Word not in sentence</p></div>
        </div>
        <div ref={analysisRef}></div>
        <div ref={analysisRef} className='text-lg'></div>
        <button ref={analysisButttonRef} className='btn bg-green-500' onClick={getAnalysis}>Ask ChatGPT for Feedback</button>
    </div>
  )
}

export default ResponseAnalysisData