/*
 * A list of all users
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import './List.sass';

export class UsersList extends Component {

  render() {
    return (
      <div className="user-list">
        <h1 className="title">Users:</h1>
        {
          this.props.users.map((u) => {
            return (
              <div>
                <span>{ u.username }</span>
              </div>
            );
          })
        }
      </div>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('usersList');
  return {
    users: Meteor.users.find({}).fetch(),
  };
}, UsersList);
