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
    
      menuListRef.current.classList.add('opacity-100')
      // menuListRef.current.classList.add('z-[100]')
    )
    :
    (
      menuToggleRef.current.icon = menuOutline,
   
      menuListRef.current.classList.remove('opacity-100'),
      menuListRef.current.classList.remove('z-50')
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
      <div className='text-3xl cursor-pointer absolute right-0 z-10 md:hidden block' >
        <IonIcon  icon={menuOutline} onClick={handleMenu} ref={menuToggleRef} />
      </div>

    {/* Links */}
    <div className=' w-full bg-yellow-200 h-screen absolute md:h-auto  md:relative md:w-auto md:text-right '>
        <ul ref={menuListRef} className=' flex flex-col text-center md:flex md:flex-row md:items-center '>
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
