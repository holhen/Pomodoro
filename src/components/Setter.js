import React from 'react'

function Setter(props) {
    return (
        <div>
            <p id={`${props.id}-label`}>{props.name}</p>
            <p><i className="fas fa-arrow-down" id={`${props.id}-decrement`} onClick={props.decrement}></i>
               <span id={`${props.id}-length`} className="length-label">{props.time}</span>
               <i className="fas fa-arrow-up" id={`${props.id}-increment`} onClick={props.increment} ></i>
            </p>
        </div>
    )
}

export default Setter;