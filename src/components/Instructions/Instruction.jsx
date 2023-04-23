import React from 'react'
// import goScreenComputerNoFrame from "../../assets/go-screen-no-frame.png";

const Instruction = (props) => {



  return (
    
        <div className="instruction-container mb-28">
          <div className="instruction-container__instruction-card">
            
            <p className="instruction-container__instruction-card__p">
            {props.text}
            
             
            </p>
          </div>
          <div className="instruction-container__image-card">
            <img src={props.IMG} />
          </div>
        </div>
  
  )
}

export default Instruction