import React from 'react'

const Card = ({children}) => {
  
  return (
    <div className='flex flex-col items-center justify-center overflow-hidden rounded-lg px-8 py-8 shadow-lg bg-white h-full relative'>
        {children}
        </div>
  )
}

export default Card