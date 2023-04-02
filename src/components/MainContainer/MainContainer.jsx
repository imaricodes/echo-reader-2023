import React from 'react'
import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
// import StudentReadLogo from '../../StudentReadLogo/StudentReadLogo'
import studentIMG from '../../assets/student-reading.svg'

const MainContainer = () => {

  return (
    

 
        <div className='main-container m-6 md:mx-28  lg:flex lg:mx-14 lg:justify-center lg:gap-16 lg:m-16 lg:mt-[10%]'>
          
          <div className='lg:w-[600px] xl:w-[700px] '>
          <ControlsContainer/>
          <Stage/>
          </div>
          <div className='hidden bg-white card  lg:flex lg:shrink-0 lg:w-[383px] lg:items-center lg:justify-center xl:w-[450px] '>
            <img className=' ' src={studentIMG} alt="Student reading book"/>
          </div>
        </div>

  )
}

export default MainContainer