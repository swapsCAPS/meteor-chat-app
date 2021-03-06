/*
 * A simple component to render a username by id and flash slightly when a user is typing
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

export class UsernameById extends Component {
  componentDidUpdate() {
    // Set the text color with a CSS class
    if(this.props.isTyping) {
      ReactDOM.findDOMNode(this).classList.add('is-typing');
    } else {
      ReactDOM.findDOMNode(this).classList.remove('is-typing');
    }
  }

  render() {
    const { user } = this.props;
    const username = user ? user.username : 'undefined';
    return (
      <span className="username ellipsis">{ username }</span>
    );
  }
}

UsernameById.propTypes = {
  id: PropTypes.string.isRequired,
  isTyping: PropTypes.bool,
};

export default createContainer((props) => {
  Meteor.subscribe('users');
  return {
    user: Meteor.users.findOne(props.id),
  };
}, UsernameById);
