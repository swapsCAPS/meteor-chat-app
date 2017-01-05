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
      <div className="list">
        <h2 className="title">New chat</h2>
        {
          this.props.users.map((u) => {
            if(u._id === Meteor.userId()) return; // Do not show ourselves in list
            return (
              <div className="list-item" onClick={ this.newChat.bind(this, u._id) } key={ u._id }>
                <span className="username ellipsis">{ u.username }</span>
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
