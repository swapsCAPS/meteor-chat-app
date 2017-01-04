import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class Message extends Component {
  componentDidMount() {
    // This user has 'seen' this message TODO fix so this runs when component is actually visible
    const { message, currentUser } = this.props;
    if (message.readBy.indexOf(currentUser) === -1) {
      // This user is not in the readBy list, add them to it
      Meteor.call('messages.setRead', message._id);
    }
  }

  belongsToCurrentUser() {
    return this.props.message.owner === this.props.currentUser._id;
  }

  alignment() {
    return this.belongsToCurrentUser() ? { justifyContent: 'flex-end' } : null;
  }

  render() {
    const { message, currentUser } = this.props;
    return (
      <div className="msg-row" style={ this.alignment() }>
        <div className="msg-container">
          <span className="msg-username">{ message.username }</span>
          <div className="msg-content">
            <div className="text">
              <span>{ message.text }</span>
            </div>
            <div className="msg-footer">
              <div className="time">
                <span>{ moment( message.createdAt ).format( 'MMM Do HH:mm:ss' ) }</span>
              </div>
              <div className="checkmark-container">
                {
                  this.belongsToCurrentUser() ?
                    message.readBy.map((uid) => {
                      if(uid === currentUser._id) return;
                      return <span>✓</span>;
                    }) : null
                }
              </div>
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
