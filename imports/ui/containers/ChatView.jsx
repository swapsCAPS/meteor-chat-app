import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';
import { Chats } from '../../api/chats.js';

import Message from '../components/Message';
import TextInput from '../components/TextInput';
import Splash from '../components/Splash';
import UsernameById from '../components/UsernameById';
import NotFoundView from '../components/NotFoundView';

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
    const { currentChatId, messages, currentUser } = this.props;
    if(!currentUser) return <NotFoundView />;
    if(!currentChatId && currentUser) return <Splash username={ currentUser.username }/>;
    return (
      <div id="chat" className="chat">
        <div id="messages-view" className="messages">
          {
            messages.map((message, index) => {
              return <Message key={ message._id } message={ message } currentUser={ currentUser }/>;
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
  currentUser: PropTypes.object.isRequired,
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
