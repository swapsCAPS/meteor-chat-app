import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';
import { Chats } from '../../api/chats.js';

import Message from '../components/Message';
import TextInput from '../components/TextInput';
import Splash from '../components/Splash';
import NotFound from '../components/NotFound';

import './ChatView.sass';

export class ChatView extends Component {

  componentDidUpdate(nextProps, nextState) {
    // Only scroll down if the amount of messages changes
    if(this.props.messages.length !== nextProps.messages.length) {
      Scroll.animateScroll.scrollToBottom( { isDynamic: true, containerId: 'messages-view' } );
    }
  }

  render() {
    const { currentChatId, messages, currentUser } = this.props;
    if(!currentUser) return <NotFound />;
    if(!currentChatId && currentUser) return <Splash username={ currentUser.username }/>;
    return (
      <div id="chat" className="chat">
        <div id="messages-view" className="messages">
          {
            messages.map((message, index) => {
              return <Message name={ message._id } key={ message._id } message={ message } currentUser={ currentUser }/>;
            })
          }
        </div>
        <div className="input-footer">
          <TextInput currentChatId={ currentChatId }/>
        </div>
      </div>
    );
  }
}

ChatView.propTypes = {
  currentUser: PropTypes.object,
  currentChatId: PropTypes.string,
  chat: PropTypes.object,
  messages: PropTypes.array.isRequired,
};

export default ChatViewContainer = createContainer((props) => {
  Meteor.subscribe('messages', props.currentChatId);
  return {
    messages: Messages.find().fetch(),
    chat: Chats.findOne({ _id: props.currentChatId }),
    currentUser: Meteor.user()
  };
}, ChatView);
