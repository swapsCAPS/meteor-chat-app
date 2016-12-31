/*
 * A of all chats this user is participating in
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import './List.sass'

export class ChatsList extends Component {

  render() {
    return (
      <div className="chats-list">
        <h1 className="title">Chats:</h1>
      </div>
    );
  }
}

ChatsList.propTypes = {
};

export default createContainer(() => {
  // Meteor.subscribe('');
  return {
  };
}, ChatsList);
