import React from 'react'
import ControlsContainer from '../Controls/ControlsContainer'
import Stage from '../Stage/Stage'
// import StudentReadLogo from '../../StudentReadLogo/StudentReadLogo'
import studentIMG from '../../assets/student-reading.svg'

const MainContainer = () => {

  return (
    

 
        <div className='main-container m-6 md:mx-28 lg:flex lg:justify-center lg:gap-16 lg:m-16 lg:mt-[10%] '>
          
          <div className='lg:max-w-xl'>
          <ControlsContainer/>
          <Stage/>
          </div>
          <div className='hidden  card lg:h-full lg:flex lg:shrink-0 lg:items-center lg:justify-center'>
            <img className='h-60 ' src={studentIMG} alt="Student reading book"/>
          </div>
        </div>

  )
}

export default MainContainer