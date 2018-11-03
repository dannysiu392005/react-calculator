import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screenV: '0',
      op1: '0',
      op2: null,
      opr: null
    };
    
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(i) {
    if (i === "C") { // Reset the state
      this.setState({
        screenV: '0',
        op1: '0',
        op2: null,
        opr: null
      });
    } else if ("0123456789".indexOf(i) !== -1) {
      if (this.state.opr === null) {
        let newV = '';
        if (this.state.op1 === '0') {
          newV = i;
        } else {
          newV = this.state.op1 + i;
        }
        this.setState({
          screenV: newV,
          op1: newV
        });
      } else {
        let newV = '';
        if (this.state.op2 === null) {
          newV = i;
        } else {
          newV = this.state.op2 + i;
        }
        this.setState({
          screenV: newV,
          op2: newV
        });
      }
    } else if ("+-x÷".indexOf(i) !== -1) {
      if (this.state.op2 === null) {
        this.setState({ opr: i });
      }
    } else if (i === "=") {
      if (this.state.op2 && this.state.opr) {
        let result = calculateResult(this.state);
        this.setState({
          screenV: result,
          op1: result,
          op2: null,
          opr: null
        });
      }
    } else if (i === "+/-") {
      if (this.state.opr === null) {
        let newV = (Number(this.state.op1)*-1).toString();
        this.setState({
          screenV: newV,
          op1: newV
        });
      } else if (!(this.state.op2===null)) {
        let newV = (Number(this.state.op2)*-1).toString();
        this.setState({
          screenV: newV,
          op1: newV
        });
      }
    } else if (i === "%") {
      if (this.state.opr === null) {
        let newV = (Number(this.state.op1)/100).toString();
        this.setState({
          screenV: newV,
          op1: newV
        });
      } else if (!(this.state.op2===null)) {
        let newV = (Number(this.state.op2)/100).toString();
        this.setState({
          screenV: newV,
          op1: newV
        });
      }
    } else { // i.e. the input is .
      if (this.state.opr === null) {
        if (this.state.screenV.indexOf(".") === -1) {
          let newV = this.state.op1 + '.';
          this.setState({
            screenV: newV,
            op1: newV
          });
        }
      } else {
        if (this.state.op2 === null) {
          this.setState({
            screenV: "0.",
            op2: "0."
          });
        } else {
          if (this.state.op2.indexOf(".") === -1) {
            let newV = this.state.op2 + ".";
            this.setState({
              screenV: newV,
              op2: newV
            });
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Screen value={this.state.screenV} />
        <Panel onClick={(i) => this.handleClick(i)} />
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
        <PanelRow value={["C", "+/-", "%", "÷"]} onClick={this.props.onClick}/>
        <PanelRow value={["7", "8", "9", "x"]} onClick={this.props.onClick}/>
        <PanelRow value={["4", "5", "6", "-"]} onClick={this.props.onClick}/>
        <PanelRow value={["1", "2", "3", "+"]} onClick={this.props.onClick}/>
        <PanelRow value={["0", ".", "="]} onClick={this.props.onClick}/>
      </div>
    );
  }
}

class PanelRow extends Component {
  render() {
    let buttonList = this.props.value.map(button => <Button value={button} key={button} onClick={() => this.props.onClick(button)} />);  // Keys help React identify which items have changed, are added, or are removed.
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
      <button className={className} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

var calculateResult = (state) => {
  let op1 = state.op1;
  let op2 = state.op2;
  let opr = state.opr;
  if (opr === "+") {
    return (Number(op1)+Number(op2)).toString();
  }
  if (opr === "-") {
    return (Number(op1)-Number(op2)).toString();
  }
  if (opr === "x") {
    return (Number(op1)*Number(op2)).toString();
  }
  if (opr === "÷") {
    return (Number(op1)/Number(op2)).toString();
  }
}

export default App;
