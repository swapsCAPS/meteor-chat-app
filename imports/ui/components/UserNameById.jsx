import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export class UserNameById extends Component {
  render() {
    const { user } = this.props;
    const username = user ? user.username : 'undefined';
    return (
      <span className="username">{ username }</span>
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
