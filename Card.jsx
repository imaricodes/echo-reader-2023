import React from 'react'

const Card = (props) => {
  return (
      <div className='font-bold text-2xl'>
        {props.children}
      </div>
  )
}

export default Card