import React, { Component } from 'react';

import Message from '../components/Message'

export default class Messages extends Component {

  render() {
    return (
      <div className="messages">
        <Message datetime={ Date.now() } message="yolo!" />
        <Message datetime={ Date.now() } message="swag!" />
        <Message datetime={ Date.now() } message="wow!" />
        <Message datetime={ Date.now() } message="so!" />
        <Message datetime={ Date.now() } message="1337!" />
      </div>
    );
  }
}

