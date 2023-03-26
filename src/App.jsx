import React, {useState, useRef, useEffect} from 'react'
import './App.css'

import SiteWrapper from './components/SiteWrapper';

import { browserDeviceDetection } from './utilities/browserDeviceDetection.mjs';

import BrowserWarningModal from './components/Modals/BrowserWarningModal';


function App() {
  const [openModal, setOpenModal] = useState(null)

const handleCloseModal = () => { 

  
  setOpenModal(false)
}

//TODO: make this alert a modal
//https://www.youtube.com/watch?v=D5oswSO9y-k&t=1s
useEffect(()=> {
  !browserDeviceDetection() ? setOpenModal(true) : null

},[])

  return (
    <div className="relative">
    
      <BrowserWarningModal open={openModal} closeModal={handleCloseModal}/>
      <SiteWrapper />
    </div>
  )
}

export default App
