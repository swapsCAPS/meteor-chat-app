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
        if(member._id !== Meteor.userId()) { // Do not include ourselves
          return (
            <div key={ i } className="content">
              <UsernameById key={ i } isTyping={ member.isTyping } id={ member._id } />
              <span className="footer ellipsis">
                { member.isTyping ? 'is typing...' : chat.lastMsgText }
              </span>
            </div>
          );
        }
      })
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
    // Render all chats this user is in
    return (
      <div className="list">
        <h2 className="title">Chats</h2>
        { this.props.chats.map((chat, i) => this.renderListItem(chat) ) }
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
