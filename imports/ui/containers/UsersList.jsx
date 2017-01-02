/*
 * A list of all users
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import './List.sass';

export class UsersList extends Component {

  newChat(id) {
    Meteor.call('chats.new', id);
  }

  render() {
    return (
      <div className="user-list">
        <h1 className="title">Users:</h1>
        {
          this.props.users.map((u) => {
            return (
              <div onClick={ this.newChat.bind(this, u._id) } key={ u._id }>
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
  Meteor.subscribe('users');
  return {
    users: Meteor.users.find({}).fetch(),
  };
}, UsersList);
