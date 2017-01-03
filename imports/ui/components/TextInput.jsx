import React, { Component, PropTypes } from 'react';

import { Messages } from '../../api/messages.js';

export default class TextInput extends Component {

  handleKeyUp(event) {
    Meteor.call('chats.setMemberTyping', this.props.currentChatId, true);
  }

  handleSubmit(event) {
    event.preventDefault();
    const msg = this.refs.textInput.value.trim();
    if(msg.length === 0) return;
    Meteor.call('messages.insert', msg, this.props.currentChatId);
    this.refs.textInput.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input onKeyUp={this.handleKeyUp.bind(this)} className="text-input" ref="textInput" placeholder="Start typing : )" type="text"/>
      </form>
    );
  }
}

TextInput.propTypes = {
  currentChatId: PropTypes.string.isRequired,
};
