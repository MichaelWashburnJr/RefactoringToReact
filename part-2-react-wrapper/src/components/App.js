import React from 'react';

export default class App extends React.Component {

  /****************************************************
   * All the functions were moved into this App class 
   ****************************************************/

  updateTableWithPeople(people) {
    people.forEach(this.insertPersonIntoTable);
  }

  insertPersonIntoTable(person) {
    $("#people-table-body").append(
      "<tr>" +
        "<td>" + person.name.first + ' ' + person.name.last + '</td>' +
        "<td>" + person.dob + '</td>' +
        "<td>" + person.email + '</td>' +
        "<td>" + person.phone + '</td>' +
        "<td>" + person.cell + '</td>' +
      "</tr>"
    );
  }

  fetchPeople() {
    $.get('https://randomuser.me/api/?results=10',
      // use () => { ... } instead of function() { ... }
      // to keep the same scope as the parent function.
      // this lets us still use the "this." keyword
      // within the callback function.
      (response) => {
        this.updateTableWithPeople(response.results);
      }
    );
  }

  /****************************************************
   * componentDidMount executes after the html has
   * initially been rendered in the browser.
   ****************************************************/

  componentDidMount() {
    this.fetchPeople()
  }

  /****************************************************
   * In the render function we can return all the same
   * HTML code. 
   * Note: JSX has some differences from HTML. For
   * example, class is now className
   ****************************************************/

  render() {
    return (
      <div className="container">

        <h1>Contact Information for Random People</h1>

        <table id="person-table" className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Cell</th>
            </tr>
          </thead>

          <tbody id="people-table-body"></tbody>

        </table>

      </div>
    );
  }

}