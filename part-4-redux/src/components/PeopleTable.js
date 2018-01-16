import React from 'react';
import PersonRow from './PersonRow';

export default class PeopleTable extends React.Component {

  render() {

    // build rows in the render function using JSX
    const rows = this.props.people.map(
      (person, index) => {
        return <PersonRow key={index} person={person}/>;
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