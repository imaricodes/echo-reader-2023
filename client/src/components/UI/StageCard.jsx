import React from 'react'

const StageCard = (props) => {
    return (
    <div className= 'card card__stage card__display--flex-column  card__stage--text bg-green-200 lg:width[500px] relative '>
        {props.children}
    </div>
    )
}

export default StageCard