import {RECEIVE_PEOPLE} from '../constants/actionTypes';
import objectAssign from 'object-assign';
import initialState from './initialState';

export default function peopleReducer(state = initialState.people, action) {
  let newState;

  switch (action.type) {

    case RECEIVE_PEOPLE:
      newState = objectAssign({}, state);
      newState.peopleList = action.people;
      break;

    default:
      newState = state;
  }

  return newState;
}