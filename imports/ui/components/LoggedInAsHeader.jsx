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
      <div onClick={ this.toggleLoginButtons.bind(this) } className="logged-in-as">
        {
          this.state.showButtons ?
            <div>
              <div onClick={ this.logOut.bind(this) }>LOGOUT</div>
              <div onClick={ this.toggleLoginButtons.bind(this) }>CANCEL</div>
            </div>
            :
            <div>
              <div className="avatar"></div>
              <span className="text">Logged in as:</span>
              <span className="username">{ this.props.username }</span>
            </div> 
        }
      </div>
    );
  }
}

LoggedInAsHeader.propTypes = {
  username: PropTypes.string.isRequired,
};
