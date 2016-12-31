import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js';

import Message from '../components/Message';
import TextInput from '../components/TextInput';

import './ChatView.sass'

export class ChatView extends Component {

  render() {
    return (
      <div className="chat">
        <div className="messages">
          {
            this.props.messages.map((message) => {
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
