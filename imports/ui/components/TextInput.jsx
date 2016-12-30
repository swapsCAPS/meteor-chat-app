import React, { Component } from 'react';

export default class TextInput extends Component {

  handleSubmit(event){
    event.preventDefault();
    console.log(this.refs.textInput.value);
  }

  render() {
    return (
      <form className="text-message" onSubmit={this.handleSubmit.bind(this)}>
        <input ref="textInput" placeholder="start typing : )" type="text"/>
      </form>
    );
  }
}
