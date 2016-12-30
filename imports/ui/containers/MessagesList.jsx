import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../../api/messages.js'

import Message from '../components/Message'

export class MessagesList extends Component {

  render() {
    return (
      <div className="messages">
        {
          this.props.messages.map((message) => {
            return <Message key={ message._id } message={ message }/>
          })
        }
      </div>
    );
  }
}

MessagesList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    messages: Messages.find({}).fetch(),
  };
}, MessagesList);
