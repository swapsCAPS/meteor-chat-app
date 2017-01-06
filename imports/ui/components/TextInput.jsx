import React, { Component, PropTypes } from 'react';

import { Messages } from '../../api/messages.js';

let timeoutId = -1;

export default class TextInput extends Component {

  handleKeyUp(event) {
    // Key has been pressed set typing to true, wait for a while and set typing to false
    Meteor.call('chats.setMemberTyping', this.props.currentChatId, true);
    clearTimeout(timeoutId); // Clear the previous timeout, so we only use the last keystroke
    timeoutId = setTimeout(() => {
      Meteor.call('chats.setMemberTyping', this.props.currentChatId, false);
    }, 2000);
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
