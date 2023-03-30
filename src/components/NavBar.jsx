import React, {useRef} from 'react'
import studentIMG from '../assets/student-reading.svg'
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
    <nav className=' bg-white flex flex-col justify-start relative md:items-center md:flex md:flex-row md:justify-between'>
    {/* Logo */}
      <div className='flex justify-between items-center ml-2'>
        <div className='flex gap-16 items-center'>
          <span>
          <img className='md:h-20 h-16 inline cursor-pointer ' src={studentIMG} alt="Student reading book"/>
          </span>
          <span className='text-2xl font-[Poppins]'>
            Echo Reader
          </span>
        </div>
      </div>

    {/* Hanburger Menu */}
      <div className='text-3xl cursor-pointer fixed right-0 z-10 md:hidden block' >
        <IonIcon  icon={menuOutline} onClick={handleMenu} ref={menuToggleRef} />
      </div>

    {/* Links */}
    <div ref={menuListRef} className='  hidden w-full bg-white h-screen absolute md:flex md:h-auto  md:relative md:w-auto md:text-right '>
        <ul  className=' flex flex-col text-center md:flex md:flex-row md:items-center '>
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
