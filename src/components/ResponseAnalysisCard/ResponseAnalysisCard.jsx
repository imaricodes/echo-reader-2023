import React from 'react'
import studentIMG from '../../assets/student-reading.svg'

const ResponseAnalysisCard = () => {
  return (
    <div className='bg-white card  lg:flex lg:shrink-0 lg:w-[383px] lg:items-center lg:justify-center xl:w-[450px] '>
      <img className=' ' src={studentIMG} alt="Student reading book"/>
    </div>
  )
}

export default ResponseAnalysisCard