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

  renderMembers(chat) {
    return (
      chat.members.map((member, i) => {
        if(member._id !== Meteor.userId()) {
          return (
            <div key={ i } className="content">
              <UsernameById key={ i } isTyping={ member.isTyping } id={ member._id } />
              { this.renderFooter(member.isTyping, chat.lastMsgText) }
            </div>
          );
        }
      })
    );
  }

  renderFooter(isTyping, text) {
    // Render the footer, displays 'is typing...' if a user is typing, otherwise last message from chat
    return (
      <span className="footer ellipsis">
        { isTyping ? 'is typing...' : text }
      </span>
    );
  }

  renderListItem(chat) {
    // Render a list item, if it is the current chat, set highlight it
    const isCurrentChat = chat._id === this.props.currentChatId;
    const isSelected = isCurrentChat ? { backgroundColor: '#CFD8DC' } : null;
    return (
      <div 
        key={ chat._id } className="list-item" style={ isSelected }
        onClick={ this.handleClick.bind(this, chat._id) } >
        { this.renderMembers(chat) }
      </div>
    );
  }

  render() {
    // Render all chats
    return (
      <div className="list">
        <h2 className="title">Chats</h2>
        { this.props.chats.map((c, i) => this.renderListItem(c) ) }
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
  return {
    chats: Chats.find({}).fetch(),
  };
}, ChatsList);
