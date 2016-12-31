import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';

import Message from '../components/Message';
import TextInput from '../components/TextInput';

import './ChatView.sass';

export class ChatView extends Component {
  componentDidMount() {
    // TODO fix this bia : /
    setTimeout(() => {
      this.scrollToBottom();
    }, 100)
  }

  componentWillUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom(){
    Scroll.animateScroll.scrollToBottom({isDynamic: true, containerId: 'messages-view'});
  }

  render() {
    return (
      <div id="chat" className="chat">
        <div id="messages-view" className="messages">
          {
            this.props.messages.map((message, index) => {
              return <Message key={ message._id } message={ message } currentUser={ this.props.currentUser }/>;
            })
          }
        </div>
        <div className="input-footer">
          <TextInput />
        </div>
      </div>
    );
  }
}

ChatView.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('messages');
  return {
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user()
  };
}, ChatView);
