import React from 'react';

export default class PersonRow extends React.Component {

  render() {
    const person = this.props.person;
    return (
      <tr>
        <td>{person.name.first} {person.name.last}</td>
        <td>{person.dob}</td>
        <td>{person.email}</td>
        <td>{person.phone}</td>
        <td>{person.cell}</td>
      </tr>
    );
  }

}