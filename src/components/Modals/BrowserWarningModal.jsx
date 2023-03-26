import React from 'react'

const BrowserWarningModal = (props) => {

    if (!props.open){
        return null
    } 

  return (
    <div className='flex w-full justify-center align-center h-96 absolute left-0 top-0 bg-red-200 '>
        <div className='flex flex-col  items-center h-56 w-96 relative bg-yellow-100 rounded-md shadow-md '>
            <div className='flex w-full justify-end bg-blue-200 '>
                <button onClick={props.closeModal}>x</button>
            </div>
            <div className='flex items-center grow px-7'>
                <div>Echo Reader is optimized for Chrome. It will work on Chrome mobile, however using Chrome on a laptop or desktop is recommended. <br/><br/> Other browsers will provide an unpredicatable experience.</div>
            </div>
        </div>
    </div>
    

  )
}

export default BrowserWarningModal