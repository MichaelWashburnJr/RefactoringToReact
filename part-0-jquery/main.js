function updateTableWithPeople(people) {
  people.forEach(insertPersonIntoTable);
}

function insertPersonIntoTable(person) {
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

function fetchPeople() {
  $.get('https://randomuser.me/api/?results=10',
    // callback method
    function(response) {
      updateTableWithPeople(response.results);
    }
  );
}

/* Make an API request to populate the table */
fetchPeople();
