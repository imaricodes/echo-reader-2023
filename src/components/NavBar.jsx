import React, {useRef} from 'react'
import studentIMG from '../assets/student-reading.svg'
import studentIMGCropped from '../assets/student-reading-crop.svg'
import {IonIcon} from '@ionic/react'
import {menuOutline} from 'ionicons/icons'
import {closeOutline} from 'ionicons/icons'



const NavBar
 = () => {

  const menuToggleRef = useRef(null)
  const menuListRef = useRef(null)

  const handleMenu = () => {

    menuToggleRef.current.icon === menuOutline
    ?
    (
      menuToggleRef.current.icon = closeOutline,
      menuListRef.current.classList.remove('hidden')
    )
    :
    (
      menuToggleRef.current.icon = menuOutline,
      menuListRef.current.classList.add('hidden')
    )


  }

  return (
    <>
    <nav className='navbar navbar--padding  mb-10 relative  md:flex md:justify-between '>
    {/* Logo */}
      <div className='flex px-4 items-center pt-4 md:px-14'>
      <span className='flex shrink-0 text-4xl font-bold  '>
            Echo Reader
          </span>
          <span className='  hidden md:flex justify-start pl-4 container'>
          <img className=' h-12 shrink-0 md:shrink-0 lg:hidden lg:shrink-0 md:h-8 lg:h-14 cursor-pointer ' src={studentIMGCropped} alt="Student reading book"/>
          {/* <img className=' h-14 shrink-0 md:shrink-0 lg:hidden lg:shrink-0 md:h-14 lg:h-14 cursor-pointer ' src={studentIMG} alt="Student reading book"/> */}
          </span>
      </div>
         
     

    {/* Hanburger Menu */}
      <div className='text-3xl cursor-pointer fixed right-3 top-5 z-10 md:hidden block' >
        <IonIcon  icon={menuOutline} onClick={handleMenu} ref={menuToggleRef} />
      </div>

    {/* Links */}
    <div ref={menuListRef} className=' top-0  hidden w-full h-screen absolute md:flex  pt-4 bg-white md:h-auto   md:relative md:w-auto md:pr-0'>
        <ul  className=' flex flex-col text-center md:flex md:flex-row md:items-center md:pr-14 '>
        <li className='mx-4 my-6 md:my-0 '>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>My Echo</a>
        </li>
        <li className=' mx-4 my-6 md:my-0'>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>Instructions</a>
        </li>
        </ul>
    </div>
     

    </nav>
  </>
  )
}

export default NavBar
