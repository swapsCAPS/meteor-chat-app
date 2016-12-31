/*
 * A list of all users
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import './List.sass'

export class UsersList extends Component {

  render() {
    return (
      <div className="user-list">
        <h1 className="title">Users:</h1>
      </div>
    );
  }
}

UsersList.propTypes = {
};

export default createContainer(() => {
  // Meteor.subscribe('');
  return {
  };
}, UsersList);
