import React from 'react';
import './App.css';
import Setter from './components/Setter'
import Clock from './components/Clock'
import ClockControl from './components/ClockControl'
import Beep from './sounds/beep.wav'

let interval;

const defaultState = {
      breakLength: 5,
      sessionLength: 25,
      timerMinutes: 25,
      timerSeconds: 0, 
      stopped: true,
      sessionOn: true,
}

class App extends React.Component {
  constructor () {
    super() 
    this.state = defaultState
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

    this.audio = React.createRef();;
  }

  componentDidMount() {
        this.audio.current.load();
  }

  startStop() {
    
    if(this.state.stopped){
      this.setState({
        stopped: false
      })

      interval = setInterval(() => {
        if(this.state.timerMinutes === 0 && this.state.timerSeconds === 0) {
          this.audio.current.play();
         if (this.state.sessionOn) {
            this.setState({
              sessionOn: false,
              timerMinutes: this.state.breakLength,
              timerSeconds: 1
            })
          }
          else {
            this.setState({
              sessionOn: true,
              timerMinutes: this.state.sessionLength,
              timerSeconds: 1
            })
          }
        }
        if(this.state.timerSeconds === 0) {
          this.setState({
            timerMinutes: this.state.timerMinutes - 1,
            timerSeconds: 59
          })
        }
        else {
          this.setState({
            timerSeconds: this.state.timerSeconds - 1
          })
        }
      }, 1000)
    }

    else {
      this.setState({
        stopped: true 
      })
      clearInterval(interval);
    }
  }

  reset() {
    this.setState(defaultState);
    clearInterval(interval);
    this.audio.current.pause();
    this.audio.current.currentTime = 0;
  }

  increment(event) {
    if(!this.state.stopped)
      return;

    if(event.target.id === "session-increment" && this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1
      })
      if(this.state.sessionOn) {
        this.setState({
          timerMinutes: this.state.sessionLength + 1,
          timerSeconds: 0
        })
      }
    }
    else if(event.target.id === "break-increment" && this.state.breakLength < 60) {
      if(!this.state.stopped) 
        return;

      this.setState({
        breakLength: this.state.breakLength + 1
      })
      if(!this.state.sessionOn){
        this.setState({
          timerMinutes: this.state.breakLength + 1,
          timerSeconds: 0
        })
      }
    }
  }

  decrement(event) {
    if (event.target.id === "session-decrement" && this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1
      })
      if(this.state.stopped && this.state.sessionOn) {
        this.setState({
          timerMinutes: this.state.sessionLength - 1,
          timerSeconds: 0
        })
      }
    }
    else if (event.target.id === "break-decrement" && this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1
      })
      if(this.state.stopped && !this.state.sessionOn){
        this.setState({
          timerMinutes: this.state.breakLength - 1,
          timerSeconds: 0
        })
      }
    }
  }

  render() {
    const minutes = this.state.timerMinutes < 10 ? '0' + this.state.timerMinutes : this.state.timerMinutes;
    const seconds = this.state.timerSeconds < 10 ? '0' + this.state.timerSeconds : this.state.timerSeconds;
    const timer = `${minutes}:${seconds}` ;
    return (
      <div className="App">
          <div className="clock-wrapper">
          <h1>Pomodoro Clock</h1>
          <div className="settings">
            <Setter name="Break Length" time={this.state.breakLength} id="break" increment={this.increment} decrement={this.decrement}/>
            <Setter name="Session Length" time={this.state.sessionLength} id="session" increment={this.increment} decrement={this.decrement}/>
          </div>
          <Clock timer={timer} sessionOn={this.state.sessionOn}/>
          <ClockControl startStop = {this.startStop} reset={this.reset}/>
        </div>
    <audio id="beep" src={Beep} ref={this.audio}/>
      </div>
    );
  }
}

export default App;
