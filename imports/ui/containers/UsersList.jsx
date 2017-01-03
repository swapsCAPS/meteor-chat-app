/*
 * A list of all users
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import './List.sass';

export class UsersList extends Component {

  newChat(otherUsersId) {
    Meteor.call('chats.new', otherUsersId, (err, data) => {
      if(err) { console.error(err); }
      this.props.setChatId(data);
    });
  }

  render() {
    return (
      <div className="user-list">
        <h1 className="title">Users:</h1>
        {
          this.props.users.map((u) => {
            return (
              <div onClick={ this.newChat.bind(this, u._id) } key={ u._id }>
                <span className="username">{ u.username }</span>
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
  setChatId: PropTypes.func.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('users');
  return {
    users: Meteor.users.find({}).fetch(),
  };
}, UsersList);
