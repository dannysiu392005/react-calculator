import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Screen value="0" />
        <Panel />
      </div>
    );
  }
}

class Screen extends Component {
  render() {
    return (
      <div className="Screen">
        {this.props.value}
      </div>
    );
  }
}

class Panel extends Component {
  render() {
    return (
      <div className="Panel">
        <PanelRow value={["C", "+/-", "%", "÷"]} />
        <PanelRow value={["7", "8", "9", "x"]} />
        <PanelRow value={["4", "5", "6", "-"]} />
        <PanelRow value={["1", "2", "3", "+"]} />
        <PanelRow value={["0", ".", "="]} />
      </div>
    );
  }
}

class PanelRow extends Component {
  render() {
    let buttonList = this.props.value.map(button => <Button value={button} key={button} />);  // Keys help React identify which items have changed, are added, or are removed.
    return (
      <div className="PanelRow">
        {buttonList}
      </div>
    );
  }
}

class Button extends Component {
  render() {
    let className = "button";
    
    if ("+-x÷".indexOf(this.props.value) !== -1) {
      className += " orange";
    } else if ("C+/-%".indexOf(this.props.value) !== -1) {
      className += " gray";
    }

    if (this.props.value === '0') {
      className += " wide";
    }

    return (
      <button className={className}>
        {this.props.value}
      </button>
    );
  }
}

export default App;
