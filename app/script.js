import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  state = {
    status: 'off',
    time: 0,
    timer: 0,
  }

  appDescription() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    )
  }

  formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.ceil(time % 60);
    
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${minutes}:${seconds}`
  }

  step = () => {  
    this.setState({
      time: this.state.time - 1,
    })

    if (this.state.time === 0) {
      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: 20,
        })
        this.playBell();
      } else if(this.state.status === 'rest'){
        this.setState({
          status: 'work',
          time: 1200,
        })
        this.playBell()
      }
    }  
  }

  startTime = () => {

    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });

    this.playBell();
  }

  stopTimer = () => {

    this.setState({
      status: 'off',
      time: 0,
    });

    clearInterval(this.state.timer);
    this.playBell();
  }

  closeApp = () => {
    window.close();
  }

  playBell = () => {
    let audio = new Audio('./sounds/bell.wav');
    audio.play();
  }

  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && this.appDescription()}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTime}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
