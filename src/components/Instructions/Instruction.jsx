import React from 'react'
import goScreenComputerNoFrame from "../../assets/go-screen-no-frame.png";

const Instruction = (props) => {
  return (
    <div className="page ">
      <div className="page-content-container">
        <h1 className="mb-6">How to Use Echo Reader</h1>
        <div className="instruction-container">
          <div className="instruction-container__instruction-card">
            <p className="instruction-container__instruction-card__p">
             {props.children}
            </p>
          </div>
          <div className="instruction-container__image-card">
            <img src={props.otherIMG} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instruction