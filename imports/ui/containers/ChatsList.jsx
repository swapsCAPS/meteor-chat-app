/*
 * A list of all chats this user is participating in
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import UsernameById from '../components/UsernameById';

import { Chats } from '../../api/chats.js';

import './List.sass';

export class ChatsList extends Component {
  handleClick(id) {
   this.props.setChatId(id);
  }

  renderListItem(chat) {
    const isCurrentChat = chat._id === this.props.currentChatId;
    const isSelected = isCurrentChat ? { backgroundColor: '#CFD8DC' } : null;
    return (
      <div className="list-item" style={isSelected} onClick={ this.handleClick.bind(this, chat._id) } key={ chat._id }>
        {
          chat.isTyping.map((isTyping, i) => {
            if(chat.members[i] === Meteor.userId()) return;
            return <UsernameById key={i} isTyping={isTyping} id={chat.members[i]} />;
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="list">
        <h2 className="title">Chats</h2>
        {
          this.props.chats.map((c, i) => {
            return this.renderListItem(c);
          })
        }
      </div>
    );
  }
}

ChatsList.propTypes = {
  setChatId: PropTypes.func,
  chats: PropTypes.array.isRequired,
  currentChatId: PropTypes.string
};

export default createContainer(() => {
  Meteor.subscribe('chats');
  Meteor.subscribe('users');
  return {
    chats: Chats.find({}).fetch(),
  };
}, ChatsList);
