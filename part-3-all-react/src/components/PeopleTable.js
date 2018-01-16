import React from 'react';

export default class PeopleTable extends React.Component {

  // //// at first we can just keep using jquery to manipulate the dom
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

  // /*
  //  * This will receive data from the parent component when
  //  * this component is rendered with new props.
  //  */
  // componentWillReceiveProps(newProps) {
  //   // call the function to insert each person into the table.
  //   newProps.people.forEach((person) => {
  //     this.insertPersonIntoTable(person);
  //   });
  // }

  // render() {
  //   return (
  //     <div className="container">

  //       <h1>Contact Information for Random People</h1>

  //       <table id="person-table" className="table">
  //         <thead>
  //           <tr>
  //             <th>Name</th>
  //             <th>DOB</th>
  //             <th>Email</th>
  //             <th>Phone</th>
  //             <th>Cell</th>
  //           </tr>
  //         </thead>

  //         <tbody id="people-table-body"></tbody>

  //       </table>

  //     </div>
  //   );
  // }

  /*
  Uncomment the above to show how jQuery can still be used temporarily
  within a react component. 

  instead of using jquery, we can leverage react for everything. */

  render() {

    // build rows in the render function using JSX
    const rows = this.props.people.map(
      (person, index) => {
        return (
          <tr key={index}>
            <td>{person.name.first} {person.name.last}</td>
            <td>{person.dob}</td>
            <td>{person.email}</td>
            <td>{person.phone}</td>
            <td>{person.cell}</td>
          </tr>
        );// this could be another component in itself!
      });

    return (
      <div className="container">

        <h1>Contact Information for Random People</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Cell</th>
            </tr>
          </thead>

          <tbody>
            {rows}
          </tbody>

        </table>

      </div>
    );
  }

}