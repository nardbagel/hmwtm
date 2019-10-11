import React from 'react';
import { Button } from 'react-bootstrap';

export default class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.calculateAmount = this.calculateAmount.bind(this);

    this.state = {
      interval: null,
      meetingMembers: [],
      runningAmount: 0,
      updateAmount: this.props.people.reduce((sum, p) => sum += p.incrementalAmount, 0),
      startTime: null,
      running: false
    }
  }

  update() {
    var time = new Date().getTime() - this.state.startTime;
    this.setState({ runningAmount: this.state.updateAmount * time * 10 });
  }

  start() {
    this.setState({ running: true });
    this.setState({ startTime: new Date().getTime() });
    this.setState({
      interval: setInterval(() => {
        this.update();
      }, 100)
    });
  }

  pause() {
    clearInterval(this.state.interval);
    this.setState({ running: false });
  }

  reset() {
    this.pause();
    this.setState({ runningAmount: 0 });
  }

  calculateAmount() {
    let tempAmt = 0
    this.props.people.map((p) => tempAmt += p.incrementalAmount);
    this.setState({ updateAmount: tempAmt });
  }

  render() {
    return (
      <div>
        <div>${this.state.runningAmount.toFixed(2)}</div>
        <div>{this.state.updateAmount}</div>
        {this.state.running ? <Button onClick={this.pause} bsStyle="danger">Pause</Button> : <Button onClick={this.start} bsStyle="success">Start</Button>}
      </div>);
  }
}