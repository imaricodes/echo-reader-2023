import React, { useEffect } from 'react'

const TimeUpCard = () => {

  useEffect(() => { 
    if (localStorage.getItem('cue') !== null) {
      localStorage.removeItem('cue')
    }
  }, [])
  return (
    <div className='card card__stage card__stage--text card__display--flex-column '>
    <p>
      Oops! You ran out of time. Click 'Again' to try a new sentence.
    </p>
  </div>
  )
}

export default TimeUpCard