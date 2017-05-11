import React, { Component } from 'react';
import EmployeeInput from './employeeInput';
import {Table, Button} from 'react-bootstrap';

export default class Counter extends Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.calculateAmount = this.calculateAmount.bind(this);
    this.deleteAllPeople = this.deleteAllPeople.bind(this);

    this.state = {
      interval: null,
      meetingMembers: [],
      runningAmount: 0,
      updateAmount: 0,
      startTime: null
    }
  }

  update() {
    var time = new Date().getTime() - this.state.startTime;
    this.setState({ runningAmount: this.state.updateAmount * time * 10 });
  }

  start(){
    this.setState({startTime: new Date().getTime()});
    this.setState({
      interval: setInterval(() => {
      this.update();
    }, 100)});
  }

  pause(){
    clearInterval(this.state.interval);
  }

  reset(){
    this.pause();
    this.setState({ runningAmount: 0 });
  }

  addPerson(newMember){
    let tempArray = this.state.meetingMembers.slice();
    tempArray.push(newMember);
    let p = new Promise((res,rej) => {
      this.setState({ meetingMembers: tempArray });
    })
    p.then(() => this.calculateAmount()).done();
  }

  deletePerson(id){
    this.setState({ meetingMembers: this.state.meetingMembers.filter((m)=> id !== m.id) });
    this.calculateAmount();
  }

  deleteAllPeople(){
    this.setState({ meetingMembers: []});
    this.calculateAmount();
  }

  calculateAmount(){
        let tempAmt = 0
        this.state.meetingMembers.map((m) => { tempAmt += m.incrementalAmount });
        this.setState({ updateAmount: tempAmt });
  }

  render() {
    let trs = this.state.meetingMembers.map((member) => (<tr key={member.id}>
        <td>{member.id}</td>
        <td>{member.name}</td>
        <td>{member.incrementalAmount}</td>
        <td><Button onClick={() => this.deletePerson(member.id)} bsStyle="danger" bsSize="xsmall">X</Button></td>
      </tr> ));

    return (
    <div>
      <div>{ this.state.runningAmount.toFixed(2) }</div>
      <div>{ this.state.updateAmount }</div>
      <Button onClick={this.start} bsStyle="success">Start</Button>
      <Button onClick={this.pause} bsStyle="danger">Pause</Button>
      <EmployeeInput add={ this.addPerson }  />
        <Table responsive hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Update Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {trs}
        </tbody>
      </Table>
      <Button onClick={ this.deleteAllPeople } bsStyle="danger">Delete All</Button>
    </div>);
  }
}
