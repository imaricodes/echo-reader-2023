import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
import ResponseAnalysisCard from '../ResponseAnalysis/ResponseAnalysisCard'


const MainContainer = () => {


  return (
        <div className='main-container'>
          <div className='lg:w-[600px] xl:w-[700px]'>
            <ControlsContainer/>
            <Stage/>
          </div>
          <ResponseAnalysisCard/>
        </div>
  )
}

export default MainContainer