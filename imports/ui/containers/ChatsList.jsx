/*
 * A list of all chats this user is participating in
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Chats } from '../../api/chats.js';

import './List.sass';

export class ChatsList extends Component {

  getMember(id) {
    return Meteor.users.findOne(id);
  }

  handleClick(id) {
   this.props.setChatId(id);
  }

  renderChatListItem(chat) {
    return (
      <div onClick={ this.handleClick.bind(this, chat._id) } key={ chat._id }>
        {
          chat.members.map((m, i) => {
            return <span key={ i }>{ this.getMember(m).username }</span>;
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="chats-list">
        <h1 className="title">Chats:</h1>
        {
          this.props.chats.map((c) => {
            return this.renderChatListItem(c);
          })
        }
      </div>
    );
  }
}

ChatsList.propTypes = {
  setChatId: PropTypes.func,
  chats: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('chats');
  Meteor.subscribe('users');
  return {
    chats: Chats.find({}).fetch(),
  };
}, ChatsList);
