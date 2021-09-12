import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayHourCheck from './DisplayHour';
import TimeComponent from './timeComponent';

class Cronometer extends Component {
  constructor() {
    super();
    this.state = {
      start: false,
      viewHour: false,
      hour: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  displayHour = ({ target: { name, checked } }) => {
    this.setState({
      [name]: checked,
      hour: 0,
    });
  };

  stopEvents = () => {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.intervalId) clearInterval(this.intervalId);
  }

  countDown = () => {
    this.setState({ start: true });
    // let secondsFalse = false;
    // let minutesFalse = false;
    this.counterId = setInterval(() => {
      this.setState(({ hour, minutes, seconds }) => (
        seconds > 0 ? { seconds: seconds - 1 }
          : (minutes > 0 ? { minutes: minutes - 1, seconds: 59 }
            : (hour > 0 ? { hour: hour - 1, minutes: 59, seconds: 59 }
              : clearInterval(this.counterId) && { start: false }))

        // (secondsFalse && minutes > 0)
        //     ? { minutes: minutes - 1, seconds: 59 } && (secondsFalse = false)
        //     : (minutesFalse = true)
  
        // (minutesFalse && hour > 0)
        //     ? { hour: hour - 1, minutes: 59, seconds: 59 } && (minutesFalse = false)
        //     : clearInterval(this.counterId) && { start: false }
      ));
    }, 1000);
  }

  render() {
    const { viewHour, hour, minutes, seconds } = this.state;
    const { changeTimer } = this.props;
    return (
      <section className="cronometer-box">
        <DisplayHourCheck curCondition={ viewHour } getCondition={ this.displayHour } />
        <div className="cronometer">
          { viewHour ? <><TimeComponent
            unit="hour"
            curTime={ hour }
            increase={ (ev) => changeTimer(this , ev, true) }
            decrease={ (ev) => changeTimer(this, ev) }
            clearEv={ this.stopEvents }
          /> : </> : '' }
          <TimeComponent
            unit="minutes"
            curTime={ minutes }
            increase={ (ev) => changeTimer(this , ev, true) }
            decrease={ (ev) => changeTimer(this , ev) }
            clearEv={ this.stopEvents }
          /> :
          <TimeComponent
            unit="seconds"
            curTime={ seconds }
            increase={ (ev) => changeTimer(this , ev, true) }
            decrease={ (ev) => changeTimer(this , ev) }
            clearEv={ this.stopEvents }
          />
        </div>
        <button onClick={ this.countDown }>Start</button>
      </section>
    );
  }
}

Cronometer.propTypes = { changeTimer: PropTypes.func.isRequired }

export default Cronometer;
