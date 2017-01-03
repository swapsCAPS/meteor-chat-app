import React, { Component, PropTypes } from 'react';

export default class Splash extends Component {
  render() {
    return (
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <h3 style={{fontSize: 32, textAlign: 'center'}}>Welcome { this.props.username }</h3>
          <h3 style={{fontSize: 24, textAlign: 'center'}}>Click a user on the left to start a chat</h3>
          <h3 style={{fontSize: 24, textAlign: 'center'}}>: )</h3>
      </div>
      </div>
    );
  }
}

Splash.propTypes = {
  username: PropTypes.string.isRequired,
};
