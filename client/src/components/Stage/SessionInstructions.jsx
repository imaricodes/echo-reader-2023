

const SessionInstructions = ({setStageState}) => {

    const handleClick = () => {
        // console.log("handle set stage state")
        setStageState('cue')

    }

  return (
    <div>
        <p>On the next screen, click MIC to reocrd your voice</p>
        <p>Echo Reader will not hear you until you click the MIC</p>
        <p>After reading the sentence, wait for results.</p>
        <button onClick={handleClick}>I am Ready!</button>
        
    </div>
  )
}

export default SessionInstructions