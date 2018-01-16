import React from 'react';
import PeopleTable from './PeopleTable';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    // define a local state for storing variables that
    // update the UI when changed
    this.state = {
      people: []
    };
  }

  //// move the table-displaying functions into PeopleTable.js
  // updateTableWithPeople(people) {
  //   people.forEach(this.insertPersonIntoTable);
  // }

  // insertPersonIntoTable(person) {
  //   $("#people-table-body").append(
  //     "<tr>" +
  //       "<td>" + person.name.first + ' ' + person.name.last + '</td>' +
  //       "<td>" + person.dob + '</td>' +
  //       "<td>" + person.email + '</td>' +
  //       "<td>" + person.phone + '</td>' +
  //       "<td>" + person.cell + '</td>' +
  //     "</tr>"
  //   );
  // }

  //// Move fetch functionality directly into componentDidMount 
  //// and pass the data through this.state.people instead
  // fetchPeople() {
  //   $.get('https://randomuser.me/api/?results=10',
  //     (response) => {
  //       this.updateTableWithPeople(response.results);
  //     }
  //   );
  // }

  componentDidMount() {
    /*
    keep data-fetching functionality fairly high level and 
    pass the results down through the rest of your system */
    fetch('https://randomuser.me/api/?results=10')
      .then(response => response.json())
      .then(json => {
        // use the setState fuction to save the results to the state
        // using the setState fuction triggers another render()
        this.setState({people: json.results})
      });
  }


  render() {
    // move all the table-specific code to the PeopleTable and
    // render the PeopleTable component here
    return (
      <div className="container">
        <PeopleTable people={this.state.people}/>
      </div>
    );
  }

}