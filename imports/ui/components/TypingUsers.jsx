import React, { Component } from 'react';

export default class TypingUsers extends Component {

  render() {
    return (
      <div>
        {
          this.props.users.map((user) => {
            return <span>{user.username}</span>;
          })
        }
      </div>
    );
  }

}
