import React from 'react'
import studentIMG from '../assets/student-reading.svg'
const Header = () => {
  return (
    <>
    <header>
    <img src={studentIMG} alt="Student reading img" />
      <h1>ECHO READER</h1>
    </header>
  </>
  )
}

export default Header