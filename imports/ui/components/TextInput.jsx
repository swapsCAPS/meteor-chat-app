import React, { Component } from 'react';

import { Messages } from '../../api/messages.js';

export default class TextInput extends Component {

  handleSubmit(event){
    event.preventDefault();
    console.log(this.refs.textInput.value);
    Meteor.call('messages.insert', this.refs.textInput.value.trim());
  }

  render() {
    return (
      <form className="text-message" onSubmit={this.handleSubmit.bind(this)}>
        <input ref="textInput" placeholder="start typing : )" type="text"/>
      </form>
    );
  }
}
