import React, {useRef, useContext} from 'react'
import {IonIcon} from '@ionic/react'
//TODO: UPDATE to use react-icons instead of ionicons
import {menuOutline} from 'ionicons/icons'
import {closeOutline} from 'ionicons/icons'
import {SessionContext} from '../contexts/SessionContext'





const NavBar = () => {

  const {sessionState, setSessionState, socket} = useContext(SessionContext);

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

  const goHome = () => { 
    console.log('goHome clicked')
    if (socket){
      if (sessionState === 'listen') {
        socket.emit("cancel_session", "cancel_session from navbar logo click");
        setSessionState('go')
      } else setSessionState('go')
    } else setSessionState('go')
  }

  return (
    <>
    <nav className='navbar min-w-[320px] mb-8 sm:mb-10 relative  md:flex md:justify-between '>
    {/* Logo */}
 
      <span className='pt-4  px-4 flex items-center text-4xl font-bold md:px-14 cursor-pointer ' onClick={goHome}>
            Echo Reader
        </span>

    {/* Hanburger Menu */}
      <div className='text-3xl cursor-pointer absolute right-3 top-5 z-10 md:hidden block' >
        <IonIcon  icon={menuOutline} onClick={handleMenu} ref={menuToggleRef} />
      </div>

    {/* Links */}
    <div ref={menuListRef} className=' top-0  hidden w-full h-screen absolute md:flex  pt-4 bg-white md:h-auto   md:relative md:w-auto md:pr-0'>
        <ul  className=' flex flex-col text-center font-semibold md:flex md:flex-row md:items-center md:pr-14 '>
        <li className='mx-4 my-6 md:my-0 '>
          <a href='#' className='text-xl  hover:text-green-700 duration-200'>About</a>
        </li>
        <li className=' mx-4 my-6 md:my-0'>
          <a href='#' className='text-xl hover:text-green-700 duration-200'>Instructions</a>
        </li>
        </ul>
    </div>
     

    </nav>
  </>
  )
}

export default NavBar
