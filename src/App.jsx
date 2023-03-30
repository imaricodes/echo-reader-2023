import React, {useState, useRef, useEffect} from 'react'
import './App.css'
import SiteWrapper from './components/SiteWrapper';
import { SessionContextProvider } from './contexts/SessionContext';


function App() {

  return (

    <SessionContextProvider>
    <div className="relative">
      <SiteWrapper />
    </div>
    </SessionContextProvider>
  )
}

export default App
