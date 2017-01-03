import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export class UserNameById extends Component {
  render() {
    return (
      <span>{ this.props.user.username }</span>
    );
  }
}

UserNameById.propTypes = {
  id: PropTypes.string.isRequired,
};

export default createContainer((props) => {
  Meteor.subscribe('users');
  return {
    user: Meteor.users.find({ _id: props.id }).fetch()[0],
  };
}, UserNameById);
