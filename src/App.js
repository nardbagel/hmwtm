import React, { Component } from 'react';
import Counter from './Counter';
import { Table, Button } from 'react-bootstrap';
import EmployeeInput from './EmployeeInput.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.addPerson = this.addPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.deleteAllPeople = this.deleteAllPeople.bind(this);

    this.state = {
      people: []
    }
  }

  addPerson(newPerson){
    let tempArray = this.state.people.slice();
    tempArray.push(newPerson);
    this.setState({ people: tempArray });
  }
 
  deleteAllPeople(){
    this.setState({ people: []});
  }

  deletePerson(id){
    this.setState({ people: this.state.people.filter((m)=> id !== m.id) });
  }

  render() {
    let trs = this.state.people.map((member) => (
    <tr key={member.id}>
        <td>{member.id}</td>
        <td>{member.name}</td>
        <td>{member.incrementalAmount}</td>
        <td><Button onClick={() => this.deletePerson(member.id)} bsStyle="danger" bsSize="xsmall">X</Button></td>
      </tr> ));
    return <div>
      <Counter people = {this.state.people}/>
      
      <EmployeeInput 
        addPerson = {this.addPerson} 
        deletePerson = {this.deletePerson} 
        deleteAllPeople = {this.deleteAllPeople}/>
      
      {this.state.people.length > 0 && 
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
      </Table>}
      {this.state.people.length > 0 && <Button onClick={ this.deleteAllPeople } bsStyle="danger">Delete All</Button>}
    </div>
  }
}
