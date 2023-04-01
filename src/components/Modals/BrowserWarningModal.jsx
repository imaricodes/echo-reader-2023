import React, {useState, useEffect, useContext, useRef} from 'react'
import { SessionContext } from '../../contexts/SessionContext'
import { browserName, isMobile, isIOS, isAndroid} from 'react-device-detect';


const BrowserWarningModal = () => {

    const checkForBrowserSupport = () => {
        if (!isMobile && (browserName === 'Chrome' || browserName === 'Firefox')) {
            return true
        } else if (isAndroid && (browserName === 'Chrome' || browserName === 'Firefox')) {
            return true
        }
        else {
            return false
        }
    }
    
    const {sessionState, setSessionState} = useContext(SessionContext);
    const [openModal, setOpenModal] = useState(null);
    const [browserIsSupported, setBrowserIsSupported] = useState(
        function getInitialState() {
           return checkForBrowserSupport()
        }
    );

    const modalRef = useRef(null)
    const browserWarningModalShown = useRef(false)

    const onContinue = () => {
        setOpenModal(false)
    }

    const onCancelSession = () => { 
        setSessionState('go')
        setOpenModal(false)
    }


    useEffect(()=> {

        if (browserWarningModalShown.current === false && browserIsSupported === false) {
            if (sessionState === 'start') {
                console.log(`browser is not supported, showing modal`)
                //show modal
                modalRef.current.classList.remove('hidden')
                modalRef.current.classList.add('flex')
                
                //prevent modal from showing again
                browserWarningModalShown.current = true
            }
        }
    },[sessionState])

    useEffect(()=> {

        //hide modal
        if (openModal === false) {
            modalRef.current.classList.remove('flex')
            modalRef.current.classList.add('hidden')
        }
    },[openModal])


  return (
    <div ref={modalRef} className={`fixed inset-0 hidden w-full bg-black bg-opacity-30 h-screen backdrop-blur-sm  justify-center items-center z-50`}>
        <div className='flex flex-col  items-center w-96  pt-7 pb-8 px-4 m-4 bg-white rounded-md shadow-md '>
       
            <div className='flex flex-col items-center  gap-2 px-4 mb-6'>
                <p>Echo Reader works best on a desktop or laptop computer using Chrome, Firefox, or Brave browsers.</p>
                <p>Using other browsers or Apple mobile devices may provide an unpredicatable experience.</p>
            </div>
            <div className='flex gap-7'>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold h-8 rounded-full px-4' onClick={onCancelSession}>Cancel</button>
                <button className='bg-green-500 hover:bg-green-700 text-white  font-bold h-8 rounded-full px-4' onClick={onContinue}>Continue</button>
            </div>
        </div>
    </div>
    

  )
}

export default BrowserWarningModal