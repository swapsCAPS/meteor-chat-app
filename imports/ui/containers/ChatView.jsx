import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';
import { Chats } from '../../api/chats.js';

import Message from '../components/Message';
import TextInput from '../components/TextInput';
import Splash from '../components/Splash';
import UsernameById from '../components/UsernameById';

import './ChatView.sass';

export class ChatView extends Component {
  componentDidMount() {
    // TODO fix this bia : /
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  componentWillUpdate(nextProps, nextState) {
    // Only scroll down if the amount of messages changes
    if(this.props.messages.length !== nextProps.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    Scroll.animateScroll.scrollToBottom( { isDynamic: true, containerId: 'messages-view' } );
  }

  render() {
    return (
      this.props.currentChatId ?
      <div id="chat" className="chat">
        <div id="messages-view" className="messages">
          {
            this.props.messages.map((message, index) => {
              return <Message key={ message._id } message={ message } currentUser={ this.props.currentUser }/>;
            })
          }
        </div>
        <div className="input-footer">
          <TextInput currentChatId={ this.props.currentChatId }/>
        </div>
      </div>
      : <Splash username={ this.props.currentUser.username }/>
    );
  }
}

ChatView.propTypes = {
  currentChatId: PropTypes.string.isRequired,
  chat: PropTypes.object,
  messages: PropTypes.array.isRequired,
};

export default ChatViewContainer = createContainer((props) => {
  Meteor.subscribe('singleChat', props.currentChatId);
  Meteor.subscribe('messages', props.currentChatId);
  return {
    messages: Messages.find().fetch(),
    chat: Chats.findOne({ _id: props.currentChatId }),
    currentUser: Meteor.user()
  };
}, ChatView);
