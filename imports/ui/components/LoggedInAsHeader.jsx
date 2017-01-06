/*
 * Simple header which shows current user, click to reveal logout button
 */
import React, { Component, PropTypes } from 'react';

export default class LoggedInAsHeader extends Component {
  state = {
    showButtons: false,
  }

  logOut() {
    if(confirm('Are you sure?')) {
      Meteor.logout();
    }
  }

  toggleLoginButtons() {
    this.setState( { showButtons: !this.state.showButtons } );
  }

  render() {
    return (
      <div className="logged-in-as">
        {
          this.state.showButtons ?
            <div className="button-container">
              <div className="button" onClick={ this.logOut.bind(this) }>LOGOUT</div>
              <div className="button" onClick={ this.toggleLoginButtons.bind(this) }>CANCEL</div>
            </div>
            :
            <div>
              <div className="avatar"></div>
              <span className="text">Logged in as:</span>
              <span className="username" onClick={ this.toggleLoginButtons.bind(this) }>{ this.props.username }</span>
            </div> 
        }
      </div>
    );
  }
}

LoggedInAsHeader.propTypes = {
  username: PropTypes.string.isRequired,
};
