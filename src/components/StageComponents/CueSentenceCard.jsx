import React, {useRef, useEffect} from 'react'
import {IonIcon} from '@ionic/react'
import {micOutline} from 'ionicons/icons'



const CueSentenceCard = (props) => {

  const cuePresentationContainerRef = useRef();

  useEffect(()=> {

    cuePresentationContainerRef.current.innerText = props.cue;

    // if (cuePresentationContainerRef.current.childNodes.length===0) {
    // let newDiv = document.createElement("div");
    //   newDiv.classList.add("cue");
    //   newDiv.innerText = props.cue;
    //   cuePresentationContainerRef.current.appendChild(newDiv);
    // }
   
  },[])


  return (

    <div className= 'card card--bg-gray card--shadow card__stage--height card__stage--text card__display--flex-column relative '>
      <div className='items-end w-full absolute top-0 bg-yellow-100'> 
        <div className='flex w-full justify-between items-center px-4 py-2'> <p>timer</p> <IonIcon  icon={micOutline}/> </div>
      </div>
       
      <div ref={cuePresentationContainerRef}></div>
        
     
    </div>
  )
}

export default CueSentenceCard