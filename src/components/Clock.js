import React from 'react'

function Clock(props) {
    return (
        <div className="clock">
            <p id="timer-label">{props.sessionOn ? "Session" : "Break"}</p>
            <p id="time-left">{props.timer}</p>
        </div>
    )
}

export default Clock