"use strict";

import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout= this.logout.bind(this);
  }

  logout() {
      this.props.logout();
      browserHistory.push('/signin');
  }
  render() {
    return (
      <div className="container-fluid main-container">
           { Object.keys(this.props.user).length ? <Header logout={this.logout}/> : ''}
           
          {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
     user: state.user
  }
}

export default connect(mapStateToProps, {
  logout
})(App);