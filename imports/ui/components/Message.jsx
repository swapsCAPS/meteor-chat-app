import React, { Component } from 'react';

export default class Message extends Component {

  render() {
    return (
      <div className="message">
        <span>{ this.props.datetime }</span>
        <span> - </span>
        <span>{ this.props.message }</span>
      </div>
    );
  }
}


