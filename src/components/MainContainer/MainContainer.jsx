import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
import ResponseAnalysisCard from '../ResponseAnalysis/ResponseAnalysisCard'


const MainContainer = () => {


  return (
        <div className='main-container mx-6 md:mx-28  lg:flex lg:mx-14 lg:justify-center lg:gap-16 lg:m-16 lg:mt-[10%]'>
          <div className='lg:w-[600px] xl:w-[700px] '>
            <ControlsContainer/>
            <Stage/>
          </div>
          <ResponseAnalysisCard/>
        </div>
  )
}

export default MainContainer