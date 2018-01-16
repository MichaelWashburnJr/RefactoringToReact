import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'

import PeopleTable from './PeopleTable';
import * as peopleActions from '../actions/peopleActions';

class App extends React.Component {

  //// state.people is now managed in the redux store so we don't need this
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     people: []
  //   };
  // }

  componentDidMount() {
    // call initialization actions in componentDidMount
    this.props.peopleActions.fetchPeople();
  }


  render() {
    return (
      <div className="container">
        <PeopleTable people={this.props.people}/>
      </div>
    );
  }

}

// these functions map state and actions to props of the component

const mapStateToProps = state => {
  return {
    people: state.people.peopleList,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    peopleActions: bindActionCreators(peopleActions, dispatch)
  };
}

// when using redux "containers" need to be wrapped with a connect call
// to connect the two functions to the state and component.
export default connect(mapStateToProps, mapDispatchToProps)(App);
