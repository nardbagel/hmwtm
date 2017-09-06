import React, { Component } from 'react';
import {Button, ButtonGroup, FormGroup, FormControl} from 'react-bootstrap';

export default class EmployeeInput extends Component {
  constructor(props){
    super(props);
    this.employees = [];

    this.state = {
      id: 0,
      incrementalAmount: 0,
      pay: undefined,
      name: "",
      hourly: false
    }

    this.makeSalaried = this.makeSalaried.bind(this);
    this.makeHourly = this.makeHourly.bind(this);
    this.setName = this.setName.bind(this);
    this.add = this.add.bind(this);
    this.setIncrementalValue = this.setIncrementalValue.bind(this);
  }

  makeSalaried(salary){
    if(this.state.hourly){
      this.setState({ hourly: false });
      this.setState({ incrementalAmount: this.state.incrementalAmount/(24*250)})
    }
  }

  makeHourly(hourlyWage){
    if(!this.state.hourly){
      this.setState({ hourly: true });
      this.setState({ incrementalAmount: this.state.incrementalAmount*24*250});
    }
  }

  setIncrementalValue(e){
    let increment = 0;
    this.state.hourly ? increment = (e.target.value / (60 * 60 *1000)) : increment = (e.target.value / (60 * 60 * 1000 * 24 * 250));
    this.setState({ incrementalAmount: increment });
    this.setState({ pay: e.target.value });
  }

  setName(e) {
    this.setState({name: e.target.value});
  }

  add(){
    let newMember = {
      id: this.state.id,
      name: this.state.name,
      incrementalAmount: this.state.incrementalAmount,
    }

    if(this.state.name !== "" && this.state.pay > 0){
      this.props.addPerson(newMember);
      this.setState({id: this.state.id+1, name: "", incrementalAmount: 0, pay: undefined })
    } else {
      alert("Can't add people with no pay or name.")
    }
  }


  render() {
    return <div>
      <FormGroup bsSize="large">
        <FormControl type="text" onChange={ this.setName } value={ this.state.name } placeholder="Name" />
      </FormGroup>
      <FormGroup bsSize="large">
        <FormControl type="text" onChange={ this.setIncrementalValue } value={ this.state.pay } placeholder="0" />
      </FormGroup>
      <ButtonGroup>
        <Button onClick={this.makeHourly} bsStyle={this.state.hourly ? "primary" : "default"}>Hourly</Button>
        <Button onClick={this.makeSalaried} bsStyle={this.state.hourly ? "default" : "primary"}>Salaried</Button>
      </ButtonGroup>
      <br/>
      {this.state.name !== "" && this.state.pay > 0 && <Button bsStyle="success" onClick={ this.add }>Click to Add Person</Button>}
    </div>
  }
}