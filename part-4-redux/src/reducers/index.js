import { combineReducers } from 'redux';
import people from './peopleReducer';

const rootReducer = combineReducers({
  people,
});

export default rootReducer;