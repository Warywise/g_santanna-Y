import React, { Component } from 'react';
import './App.css';
import Cronometer from './cronometer';

class App extends Component {
  changeTimer = (owner, { target: { name } }, increase) => {
    if (increase) {
      owner.setState((prevSt) => (
        prevSt[name] < 59
        ? {
      [name]: prevSt[name] + 1,
        }
        : {
          [name]: 0,
        }
    ));

      owner.timeoutId = setTimeout(() => {
        owner.intervalId = setInterval(() => {
          owner.setState((prevSt) => (
            prevSt[name] < 59
            ? {
          [name]: prevSt[name] + 1,
            }
            : {
              [name]: 0,
            }
        ));
        }, 150);
      }, 1000);
      return;
    }

    owner.setState((prevSt) => (
      prevSt[name] > 0
        ? {
      [name]: prevSt[name] - 1,
        }
        : {
          [name]: 59,
        }
    ));

    owner.timeoutId = setTimeout(() => {
      owner.intervalId = setInterval(() => {
        owner.setState((prevSt) => (
          prevSt[name] > 0
            ? {
          [name]: prevSt[name] - 1,
            }
            : {
              [name]: 59,
            }
        ));
      }, 150);
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Nyan Counter</p>
        </header>
        <Cronometer changeTimer={ this.changeTimer } />
      </div>
    );
  }
}

export default App;
