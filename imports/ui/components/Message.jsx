import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Message extends Component {
  componentDidMount() {
    // This user has 'seen' this message
    // The message object in the db will get an array of userids who have read it
  }

  belongsToCurrentUser() {
    return this.props.message.owner === this.props.currentUser._id;
  }

  alignment() {
    return this.belongsToCurrentUser() ? { justifyContent: 'flex-end' } : null;
  }

  render() {
    return (
      <div className="msg-row" style={this.alignment()}>
        <div className="msg-container">
          <span className="msg-username">{ this.props.message.username }</span>
          <div className="msg-content">
            <div className="text">
              <span>{ this.props.message.text }</span>
            </div>
            <div className="time">
              <span>{ moment(this.props.message.createdAt).format('MMM Do HH:mm:ss') }</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};
