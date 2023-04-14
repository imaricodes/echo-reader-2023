import React, {useEffect} from 'react'

const StartCard = () => {

  useEffect(() => {
    if (localStorage.getItem('cue') !== null) {
      localStorage.removeItem('cue')
    }
  })

  return (

    <div className='card card__stage  card__display--flex-column '>
      <p className='card__start-card--text'>
        Echo Reader is a reading app that uses speech recognition to help you practice reading aloud.</p>
        <p className='card__start-card--text'> ChatGPT is also used to generate feedback to your reading. ChatGPT is known to get weird, so beware.
      </p>
    </div>

  )
}

export default StartCard