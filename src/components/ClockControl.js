import React from 'react'

function ClockControl(props) {
    return (
        <div className="clock-control">
            <span id="start_stop" onClick={props.startStop}><i className="fas fa-play"></i><i className="fas fa-pause"></i></span> 
            <span id="reset" onClick={props.reset}><i className="fas fa-sync-alt"></i></span>
        </div>
    )
}

export default ClockControl