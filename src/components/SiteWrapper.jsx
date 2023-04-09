import React from 'react'
import MainContainer from './MainContainer/MainContainer';
import NavBar from './NavBar';
import BrowserWarningModal from './Modals/BrowserWarningModal';

const SiteWrapper = () => {
  return (
    <div className='min-w-[320px]'>
      <NavBar />
      <MainContainer />
      <BrowserWarningModal/>
    </div>
  )
}

export default SiteWrapper