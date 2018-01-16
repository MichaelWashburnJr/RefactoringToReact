import * as types from '../constants/actionTypes';

/*
This action is dispatched after the API request
to inform a reducer that people have been received. */
function receivePeople(json) {
  console.log("RECEIVING");
  return {
    type: types.RECEIVE_PEOPLE,
    people: json.results
  };
}

/*
This function can be called from components to fetch people */
export function fetchPeople() {
  return dispatch => {
    console.log("Fetching");
    fetch('https://randomuser.me/api/?results=10')
      .then(response => { console.log('RECEIVED');return response; })
      .then(response => response.json())
      .then(json => dispatch(receivePeople(json)));
  };
}