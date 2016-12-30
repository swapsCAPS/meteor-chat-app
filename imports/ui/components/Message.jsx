import React, { Component, PropTypes } from 'react';

export default class Message extends Component {

  render() {
    return (
      <div className="message">
        <span>{ this.props.message.createdAt.toString() }</span>
        <span> - </span>
        <span>{ this.props.message.text }</span>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
}
