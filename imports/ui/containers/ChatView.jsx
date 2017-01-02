import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';
import { Chats } from '../../api/chats.js';

import Message from '../components/Message';
import TextInput from '../components/TextInput';
import NotFoundView from '../components/NotFoundView';

import './ChatView.sass';

export class ChatView extends Component {
  getChat() {
    return Chats.findOne(this.props.currentChatId);
  }

  getMessages() {
    return Messages.find( { 'chatId': this.props.currentChatId} );
  }

  getMember(id) {
    return Meteor.users.findOne(id);
  }

  componentDidMount() {
    // TODO fix this bia : /
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  componentWillUpdate() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    console.log('Chatview updated displaying chat: %s', this.props.currentChatId);
  }

  scrollToBottom() {
    Scroll.animateScroll.scrollToBottom( { isDynamic: true, containerId: 'messages-view' } );
  }

  render() {
    return (
      this.getChat() ?
        <div id="chat" className="chat">
          <div className="members-header">
            {
              this.getChat().members.map((id) => {
                return <span key={ id }>{ this.getMember(id).username }</span>;
              })
            }
          </div>
          <div id="messages-view" className="messages">
            {
              this.getMessages().map((message, index) => {
                return <Message key={ message._id } message={ message } currentUser={ this.props.currentUser }/>;
              })
            }
          </div>
          <div className="input-footer">
            <TextInput currentChatId={ this.props.currentChatId }/>
          </div>
        </div>
      : <NotFoundView />
    );
  }
}

ChatView.propTypes = {
  currentChatId: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('messages');
  return {
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user()
  };
}, ChatView);
