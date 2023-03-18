import React, {useRef} from 'react'
import studentIMG from '../assets/student-reading.svg'
import {IonIcon} from '@ionic/react'
import {menuOutline} from 'ionicons/icons'
import {closeOutline} from 'ionicons/icons'





const Header = () => {

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
    <nav className='p-5 bg-white md:flex md:items-center md:justify-between'>
      <div className='flex justify-between items-center'>
        <span className='text-2xl font-[Poppins]'>
          
          Echo Reader
        </span>
        <span className='text-3xl cursor-pointer md:hidden block z-[100]' >
        <IonIcon  icon={menuOutline} onClick={handleMenu} ref={menuToggleRef} />
      </span>
      </div>

     
 
      <ul ref={menuListRef} className='md:flex md:items-center  md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-0 h-full '>
        <li className='mx-4 my-6 md:my-0 '>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>My Echo</a>
        </li>
        <li className=' mx-4 my-6 md:my-0'>
          <a href='#' className='text-xl hover:text-cyan-500 duration-500'>Instructions</a>
        </li>
      
       
       </ul>

    </nav>
  </>
  )
}

export default Header