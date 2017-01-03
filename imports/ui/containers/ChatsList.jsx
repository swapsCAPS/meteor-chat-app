/*
 * A list of all chats this user is participating in
 */
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import UserNameById from '../components/UserNameById';

import { Chats } from '../../api/chats.js';

import './List.sass';

export class ChatsList extends Component {
  handleClick(id) {
   this.props.setChatId(id);
  }

  renderListItem(chat) {
    return (
      <div onClick={ this.handleClick.bind(this, chat._id) } key={ chat._id }>
        {
          chat.members.map((m, i) => {
            if(m === Meteor.userId()) return;
            return <UserNameById key={ i } id={ m } />;
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
};

export default createContainer(() => {
  Meteor.subscribe('chats');
  Meteor.subscribe('users');
  return {
    chats: Chats.find({}).fetch(),
  };
}, ChatsList);
