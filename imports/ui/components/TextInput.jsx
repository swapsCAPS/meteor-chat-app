import React, { Component } from 'react';

import { Messages } from '../../api/messages.js'

export default class TextInput extends Component {

  handleSubmit(event){
    event.preventDefault();
    console.log(this.refs.textInput.value);
    Messages.insert( { text: this.refs.textInput.value.trim(), createdAt: new Date() } )
  }

  render() {
    return (
      <form className="text-message" onSubmit={this.handleSubmit.bind(this)}>
        <input ref="textInput" placeholder="start typing : )" type="text"/>
      </form>
    );
  }
}
