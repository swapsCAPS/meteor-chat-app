import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Message extends Component {

  render() {
    return (
      <div className="message">
        <span>{ moment(this.props.message.createdAt).format('MMM Do HH:mm:ss') }</span>
        <span> - </span>
        <span>{ this.props.message.username }</span>
        <span> says: </span>
        <span>{ this.props.message.text }</span>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
};
