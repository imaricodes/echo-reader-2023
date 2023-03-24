import React, {useState,useEffect, useContext} from 'react'
import { SessionContext } from "../contexts/SessionContext";




const MicIcon = () => {
    console.log('mic icon called')
    const {sessionState, setSessionState} = useContext(SessionContext);
    const [micState, setMicState] = useState("#c5c7c5");
    const pathFill = micState;
    useEffect(()=> {
        if (sessionState === 'listen') {
            setMicState("#F83F3E");
        } else {
            return
        }
    },[sessionState])

  return (
    <div >
        <svg  
            width="100%" 
            version="1.1" id="_x32_" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 512 512" 
            xmlSpace="preserve" 
            fill="#c7c7c7" 
            stroke="#c7c7c7"
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g>
                <path fill={pathFill} d="M256.004,288.287c9.643-0.017,18.307-3.902,24.663-10.23c6.349-6.361,10.242-15.033,10.246-24.688v-87.197 c-0.004-9.639-3.897-18.311-10.246-24.656c-6.361-6.36-15.02-10.246-24.663-10.262c-9.644,0.016-18.304,3.902-24.668,10.262 c-6.345,6.344-10.238,15.017-10.242,24.656v87.197c0.004,9.656,3.897,18.328,10.242,24.688 C237.696,284.385,246.36,288.27,256.004,288.287z"></path>
                <path fill={pathFill} d="M256,0C114.614,0,0,114.614,0,256c0,141.385,114.614,256,256,256c141.385,0,256-114.615,256-256 C512,114.614,397.385,0,256,0z M199.234,166.172c0.024-31.328,25.434-56.754,56.771-56.786 c31.336,0.032,56.745,25.459,56.77,56.786v87.197c-0.024,31.344-25.438,56.754-56.77,56.786 c-31.333-0.033-56.746-25.442-56.771-56.786V166.172z M371.872,250.713c-0.024,58.787-43.951,107.295-100.717,114.779v40.434 h-30.303v-40.434c-56.766-7.484-100.701-55.992-100.721-114.779v-17.148h22.729v17.148c0.004,25.714,10.426,48.935,27.324,65.828 c16.901,16.893,40.122,27.311,65.82,27.327c25.696-0.016,48.918-10.434,65.82-27.327c16.892-16.894,27.311-40.115,27.319-65.828 v-17.148h22.73V250.713z"></path>
                </g>
            </g>
        </svg>
    </div>
      

  )
}

export default MicIcon