import React, {useRef, useEffect} from 'react'
import {IonIcon} from '@ionic/react'
import {micOutline} from 'ionicons/icons'



const CueSentenceCard = (props) => {

  const cuePresentationContainerRef = useRef();

  useEffect(()=> {

    if (cuePresentationContainerRef.current.childNodes.length===0) {
    let newDiv = document.createElement("div");
      newDiv.classList.add("cue");
      newDiv.innerText = props.cue;
      cuePresentationContainerRef.current.appendChild(newDiv);
    }
   
  },[])


  return (

    <div className= 'card card--bg-gray card--shadow card__stage--height card__stage--text card__display--flex-column'>
      <div ref={cuePresentationContainerRef}></div>
      <div className='items-end bg-yellow-100'> 
        <div className=''> <IonIcon  icon={micOutline}/> </div>
      </div>
       
        
     
    </div>
  )
}

export default CueSentenceCard