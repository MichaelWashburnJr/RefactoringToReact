import React from 'react';
import { render } from 'react-dom';
// add redux imports
import { Provider } from 'react-redux'
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
// import "reducers", which handle changes to state.
// we need to create the store with the reducers in place.
import rootReducer from './reducers';

// middlewares allow functionality to be done between actions and reducers
// thunk is a middleware that allows returning promises in actions.
const middlewares = [thunk];
// create a new store with the reducers we (will) have
let store = createStore(rootReducer, {}, compose(
  applyMiddleware(...middlewares)
));

// wrap the App component in a Provider so components can use state from the store
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
